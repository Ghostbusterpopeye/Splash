import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

type MediaState = {
  title: string;
  artist: string;
  is_playing: boolean;
  positionSeconds: number;
  durationSeconds: number;
  coverUrl?: string | null;
} | null;

function Media() {
  const [media, setMedia] = useState<MediaState>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stop = false;
    const poll = async () => {
      try {
        const m = await invoke<MediaState>("get_media");
        if (stop) return;
        setMedia(m);
        setError(null);
      } catch (e) {
        if (stop) return;
        setMedia(null);
        setError(String(e));
      }
    };
    poll();
    const id = setInterval(poll, 2000);
    return () => {
      stop = true;
      clearInterval(id);
    };
  }, []);

  async function toggle() {
    try {
      const now = await invoke<boolean>("toggle_playback_cmd");
      setMedia((prev) => (prev ? { ...prev, is_playing: now } : prev));
    } catch {
      /* abaikan */
    }
  }

  if (!media) {
    return (
      <div className="media">
        <span>♪</span>
        <span className="media-text">Tidak ada media</span>
      </div>
    );
  }

  const hasCover =
    media.coverUrl &&
    /^(https?:|file:)/.test(media.coverUrl);

  return (
    <div
      className="media media-live"
      onClick={toggle}
      title="Klik untuk play/pause"
    >
      {hasCover && media.coverUrl ? (
        <img className="media-cover" src={media.coverUrl} alt="" />
      ) : (
        <span className="media-icon">
          {media.is_playing ? "❚❚" : "▶"}
        </span>
      )}
      <div className="media-info">
        <div className="media-title">{media.title || "Tanpa judul"}</div>
        <div className="media-artist">{media.artist}</div>
      </div>
    </div>
  );
}

export default Media;
