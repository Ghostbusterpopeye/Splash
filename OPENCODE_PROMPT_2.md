PROMPT 2 — Island Morphing + Pomodoro Widget

Konteks:
- Proyek Tauri v2 + React + TypeScript + Vite di C:\Users\madan\dev\splash
- Island sekarang: src/Island.tsx (kapsul jam HH:MM) + src/Island.css
- Window "main" sudah visible:true, wide-screen transparan, alwaysOnTop
- Jangan sentuh folder ../bloom (referensi read-only)
- Jangan ubah src-tauri/*.rs (backend Rust) di prompt ini — frontend saja

Tugas (frontend-only, tidak perlu compile Rust):

1. Install framer-motion
   bun add framer-motion

2. Buat src/Pomodoro.tsx
   - State: mode ("focus" | "break"), sisa detik, running (bool)
   - Konstanta: FOCUS_SECONDS = 25*60, BREAK_SECONDS = 5*60
   - setInterval 1 detik saat running; tick decrement; kalau 0 → ganti mode otomatis
   - Display sisa waktu MM:SS
   - Tombol: Mulai / Jeda / Reset
     - Reset = kembali ke mode focus penuh 25:00, running false
   - Simpan sisa detik terakhir ke localStorage:
     - Key: "splash.pomodoro.state"
     - Simpan: JSON.stringify({ mode, seconds, running: false }) — selalu simpan running:false saat simpan (biar load dari penyimpanan mulai dalam keadaan jeda)
     - Load saat mount (useEffect)
   - UI: label kecil "FOKUS" atau "ISTIRAHAT", timer besar MM:SS, 3 tombol
     - Ganti label mode tiap selesai satu sesi
     - Style sederhana, warna tema gelap, semua teks putih, font kecil 11-12px

3. Buat src/MediaPlaceholder.tsx
   - Tampilkan teks: "Tidak ada media"
   - Style: ikon ♪ kecil + teks, opasitas 70%, font 11px

4. Buat src/IslandWidgets.tsx
   - Konten ekspansi: tampilkan Pomodoro di kiri, MediaPlaceholder di kanan
   - Layout flex row, gap 16px, padding 0 12px, tinggi penuh
   - Teks di widget pakai text-overflow:ellipsis, white-space:nowrap, overflow:hidden (auto-truncate)

5. Update src/Island.tsx (morphing)
   - Idle: width 140px, height 38px, border-radius 999px
     - Tampilkan kapsul jam HH:MM seperti sekarang
   - Hover (mouseenter kapsul): width 320px, height 56px, border-radius 999px
     - Tampilkan konten ekspansi (IslandWidgets)
   - Mouseleave: kembali ke 140x38, tampilkan kapsul jam
   - Gunakan framer-motion:
     - import { motion, AnimatePresence } from "framer-motion"
     - motion.div dengan animate={isHovered ? expanded : collapsed}
     - transition duration 0.25s, ease "easeOut"
     - AnimatePresence untuk swap konten kapsul-jam vs widget
   - isHovered via onHoverStart/onHoverEnd dari framer-motion
   - Teks jam dan widget pakai text-overflow ellipsis kalau kepanjangan

6. Update src/Island.css
   - .island { width:140px; height:38px; border-radius:999px; ... } (sama seperti sekarang)
   - Tambah class .island.expanded { width:320px; height:56px }
     - ATAU biar framer-motion yang set width/height via style prop (lebih direkomendasikan)
   - .widgets { display:flex; align-items:center; justify-content:space-between; gap:16px; padding:0 12px; height:100% }
   - .widget { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
   - .timer { font:600 20px "SF Pro Display","Segoe UI",system-ui; }
   - .timer-label { font:11px "SF Pro Display","Segoe UI",system-ui; opacity:0.7; }
   - .btn { background:rgba(255,255,255,0.12); border:none; border-radius:999px; padding:4px 10px; color:#fff; font:11px "SF Pro Display","Segoe UI",system-ui; cursor:pointer; }
   - .btn:hover { background:rgba(255,255,255,0.22) }
   - .media { font:11px "SF Pro Display","Segoe UI",system-ui; opacity:0.7; display:flex; align-items:center; gap:6px; }

7. Update src/App.tsx
   - Tetap render <Island />
   - Tidak perlu ubah apa-apa di App.tsx kecuali import

Verifikasi (jalankan sendiri):
   cd C:\Users\madan\dev\splash
   bun run tauri dev

   Kapsul harus:
   - Muncul di tengah atas (idle 140x38, jam HH:MM)
   - Saat hover: mengembang jadi 320x56, transisi 0.25s
   - Isi: Pomodoro di kiri (MM:SS + 3 tombol), "Tidak ada media" di kanan
   - Timer pomodoro jalan normal; Mulai/Jeda/Reset berfungsi
   - Tutup & buka lagi → sisa detik masih tersimpan (localStorage)

Commit:
   git add -A
   git commit -m "feat: island morph + pomodoro widget"

Aturan main:
   - Jangan ubah src-tauri/*.rs
   - Jangan sentuh ../bloom
   - Fallback: kalau framer-motion error, pakai CSS transition (karena .island.expanded sudah di CSS) — morphing tetap jalan
   - Kalau bun run tauri dev sukses tapi hover tidak trigger, cek bahwa onHoverStart/onHoverEnd terpasang di motion.div yang benar
   - Setelah commit, jangan lanjut prompt 3 dulu — pastikan semua di atas sudah teruji