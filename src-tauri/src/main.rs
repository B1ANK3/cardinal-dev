#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::CustomMenuItem;
use tauri::Manager;
use tauri::Runtime;
use tauri::SystemTray;
use tauri::SystemTrayEvent;
use tauri::SystemTrayMenu;
use tauri::SystemTrayMenuItem;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn close_splashscreen<R: Runtime>(window: tauri::Window<R>) -> bool {
    // close splash screen
    if let Some(splashscreen) = window.get_window("splashscreen") {
        splashscreen.close().unwrap();
    }

    window.get_window("main").unwrap().show().unwrap();
    true
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let hide = CustomMenuItem::new("hide".to_string(), "Hide");
    let update = CustomMenuItem::new("update".to_string(), "Check for Updates");
    let traymenu = SystemTrayMenu::new()
        .add_item(quit)
        .add_native_item(tauri::SystemTrayMenuItem::Separator)
        .add_item(hide)
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(update);

    let tray = SystemTray::new().with_menu(traymenu);

    tauri::Builder::default()
        .setup(|app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
                window.close_devtools();
            }
            Ok(())
        })
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick {
                tray_id,
                position,
                size,
                ..
            } => {
                println!("system tray left click recieved");
            }

            SystemTrayEvent::RightClick {
                tray_id,
                position,
                size,
                ..
            } => {
                println!("System tray right click recieved");
            }

            SystemTrayEvent::DoubleClick {
                tray_id,
                position,
                size,
                ..
            } => {
                println!("system tray double click received");
            }

            SystemTrayEvent::MenuItemClick { tray_id, id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }

                "hide" => {
                    let window = app.get_window("cardinal").unwrap();
                    window.hide().unwrap();
                }

                "update" => {
                    println!("System tray update app pls");
                }

                _ => {}
            },

            _ => {}
        })
        .invoke_handler(tauri::generate_handler![greet, close_splashscreen])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|_app_handle, event| match event {
            tauri::RunEvent::ExitRequested { api, .. } => {
                api.prevent_exit();
            }
            _ => {}
        });
}
