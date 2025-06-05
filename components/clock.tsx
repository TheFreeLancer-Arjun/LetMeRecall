"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const flipVariants = {
  initial: { rotateX: 90, opacity: 0 },
  animate: { rotateX: 0, opacity: 1 },
  exit: { rotateX: -90, opacity: 0 },
};

export default function FlipText() {
  const [text, setText] = useState("HELLO 12:34");

  useEffect(() => {
    // Example clock times for demo
    const words = [
      "12:34 PM",
      "12:35 PM",
      "12:36 PM",
      "12:37 PM",
      "12:38 PM",
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % words.length;
      setText(words[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const chars = text.split("");

  return (
    <div
      style={{
        perspective: 1200,
        display: "flex",
        justifyContent: "center",
        gap: 8,
        userSelect: "none",
        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {chars.map((char, i) => (
        <div
          key={char + i}
          style={{
            width: 50,
            height: 80,
            backgroundColor: "#222",
            borderRadius: 8,
            boxShadow:
              "0 6px 10px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.1)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            color: "white",
          }}
        >
          {/* Top half panel */}
          <div
            style={{
              height: "50%",
              background:
                "linear-gradient(180deg, #444 0%, #111 100%)",
              borderBottom: "1px solid #000",
              boxShadow: "inset 0 -2px 3px rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: "bold",
              paddingBottom: 6,
              userSelect: "none",
              textShadow: "0 1px 1px rgba(0,0,0,0.8)",
            }}
          >
            {char}
          </div>

          {/* Bottom half panel with flipping animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={char + i}
              variants={flipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6 }}
              style={{
                height: "50%",
                background:
                  "linear-gradient(0deg, #222 0%, #555 100%)",
                borderTop: "1px solid #000",
                boxShadow: "inset 0 2px 3px rgba(0,0,0,0.7)",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                fontSize: 32,
                fontWeight: "bold",
                paddingTop: 6,
                userSelect: "none",
                textShadow: "0 -1px 1px rgba(0,0,0,0.8)",
                transformOrigin: "center top",
                color: "white",
              }}
            >
              {char}
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
  