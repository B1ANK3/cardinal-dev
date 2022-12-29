
/**
 * Check if Tauri is loaded into the window.
 */
export function checkTauri(): boolean {
    return !!window.__TAURI_METADATA__
}