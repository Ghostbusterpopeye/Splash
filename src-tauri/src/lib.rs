// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

mod media;
use media::{get_current_media, toggle_playback};

#[tauri::command]
fn get_media() -> Result<media::MediaInfo, String> {
    get_current_media()
}

#[tauri::command]
fn toggle_playback_cmd() -> Result<bool, String> {
    toggle_playback()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_media, toggle_playback_cmd])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
