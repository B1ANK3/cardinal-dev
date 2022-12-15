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
    if let Some(splashscreen) = window.get_window("splash") {
        splashscreen.close().unwrap();
    }

    window.get_window("main").unwrap().show().unwrap();
    true
}

// Serde parsing strings that might not have a value
// Will have to write a function later that makes sure values are present and if not ignore them
// https://stackoverflow.com/questions/44301748/how-can-i-deserialize-an-optional-field-with-custom-functions-using-serde
// We don't need to parse the settings file here yet because all settings so far goto the frontend only

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

            app.listen_global("tauri://update-available".to_string(), move |_msg| {
                println!("New version available!");
            });

            Ok(())
        })
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
            SystemTrayEvent::LeftClick { .. } => {
                println!("system tray left click recieved");
            }

            SystemTrayEvent::RightClick { .. } => {
                println!("System tray right click recieved");
            }

            SystemTrayEvent::DoubleClick { .. } => {
                println!("system tray double click received");
            }

            SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                "quit" => {
                    std::process::exit(0);
                }

                "hide" => {
                    let window = app.get_window("main").unwrap();
                    window.hide().unwrap();
                }

                "update" => {
                    println!("System tray update app pls");

                    let window = app.get_window("main").unwrap();
                    // Send a empty string because None cannot be accepted
                    window.emit("tauri://update", "").unwrap();
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
