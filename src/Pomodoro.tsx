import { useEffect, useState } from "react";

const FOCUS_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;
const STORAGE_KEY = "splash.pomodoro.state";

type Mode = "focus" | "break";

function loadState(): { mode: Mode; seconds: number } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { mode?: Mode; seconds?: number };
      if (parsed.mode === "focus" || parsed.mode === "break") {
        const secs = Number.isFinite(parsed.seconds)
          ? parsed.seconds!
          : FOCUS_SECONDS;
        return { mode: parsed.mode, seconds: secs };
      }
    }
  } catch {
    /* ignore */
  }
  return { mode: "focus", seconds: FOCUS_SECONDS };
}

function Pomodoro() {
  const [mode, setMode] = useState<Mode>(() => loadState().mode);
  const [seconds, setSeconds] = useState<number>(() => loadState().seconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (seconds > 0) return;
    const next: Mode = mode === "focus" ? "break" : "focus";
    setMode(next);
    setSeconds(next === "focus" ? FOCUS_SECONDS : BREAK_SECONDS);
    setRunning(false);
  }, [seconds, mode]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ mode, seconds, running: false })
    );
  }, [mode, seconds]);

  const handleReset = () => {
    setMode("focus");
    setSeconds(FOCUS_SECONDS);
    setRunning(false);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="pomodoro">
      <div className="pomodoro-time">
        <div className="timer-label">
          {mode === "focus" ? "FOKUS" : "ISTIRAHAT"}
        </div>
        <div className="timer">
          {mm}:{ss}
        </div>
      </div>
      <div className="pomodoro-buttons">
        <button className="btn" onClick={() => setRunning((r) => !r)}>
          {running ? "Jeda" : "Mulai"}
        </button>
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Pomodoro;
