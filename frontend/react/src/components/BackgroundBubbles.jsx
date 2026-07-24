import React from 'react';

const EMOJIS = ['🌸', '💖', '✨', '💕', '🌺', '💗', '⭐', '🌷'];

const BUBBLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  top: `${(i * 7 + (i % 5) * 13 + 3) % 100}%`,
  left: `${(i * 11 + (i % 7) * 9 + 1) % 100}%`,
  size: 12 + (i % 6) * 5,
  delay: `${(i * 0.3) % 5}s`,
  duration: `${4 + (i % 5)}s`,
  emoji: EMOJIS[i % EMOJIS.length],
  opacity: 0.25 + (i % 4) * 0.15,
}));

export default function BackgroundBubbles() {
  return (
    <>
      <style>{`
        @keyframes floatBubble {
          0%   { transform: translateY(0px)   rotate(0deg)   scale(1);    }
          33%  { transform: translateY(-22px) rotate(8deg)   scale(1.12); }
          66%  { transform: translateY(-10px) rotate(-6deg)  scale(0.95); }
          100% { transform: translateY(0px)   rotate(0deg)   scale(1);    }
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {BUBBLES.map((b) => (
          <span
            key={b.id}
            className="absolute select-none"
            style={{
              top: b.top,
              left: b.left,
              fontSize: b.size,
              opacity: b.opacity,
              animation: `floatBubble ${b.duration} ${b.delay} ease-in-out infinite`,
              willChange: 'transform',
            }}
          >
            {b.emoji}
          </span>
        ))}
      </div>
    </>
  );
}
