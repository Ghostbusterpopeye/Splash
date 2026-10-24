import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Pomodoro from "./Pomodoro";
import Media from "./Media";
import "./Island.css";

const COLLAPSED = { width: 140, height: 38 };
const EXPANDED = { width: 320, height: 56 };

function Island() {
  const [now, setNow] = useState(() => new Date());
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");

  return (
    <motion.div
      className="island"
      style={{ borderRadius: 999 }}
      animate={hovered ? EXPANDED : COLLAPSED}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <AnimatePresence mode="wait">
        {hovered ? (
          <motion.div
            key="widgets"
            className="widgets"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="widget">
              <Pomodoro />
            </div>
            <div className="widget media">
              <Media />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="clock"
            className="clock"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {hh}:{mm}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Island;
