use serde::Serialize;

#[derive(Serialize)]
pub struct MediaInfo {
    pub title: String,
    pub artist: String,
    pub is_playing: bool,
    pub position_seconds: f64,
    pub duration_seconds: f64,
    pub cover_url: Option<String>,
}

pub fn get_current_media() -> Result<MediaInfo, String> {
    Err("no media session".into())
}

pub fn toggle_playback() -> Result<bool, String> {
    Err("no media session".into())
}
