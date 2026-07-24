import React, { useState } from 'react';
import ClassyButton from './ClassyButton';

export default function QuestionStep({ onYes }) {
  const [noBtnPos, setNoBtnPos] = useState({ position: 'relative' });
  const [denyIndex, setDenyIndex] = useState(0);
  const [posIndex, setPosIndex] = useState(0);

  const denyMessages = [
    "Nope! 👀 Wrong choice babe 🤔",
    "Try again! 😜 That's not it!",
    "Nice try! 🙈 Keep going...",
    "Error 404: 'No' not found 🚫",
    "Just say YES already! ❤️",
  ];

  const POSITIONS = [
    { top: '10%', left: '10%' },
    { top: '10%', left: '65%' },
    { top: '78%', left: '10%' },
    { top: '78%', left: '65%' },
    { top: '44%', left: '4%'  },
    { top: '44%', left: '72%' },
    { top: '22%', left: '38%' },
    { top: '68%', left: '36%' },
  ];

  const dodgeNoButton = () => {
    const nextPos = (posIndex + 1) % POSITIONS.length;
    setDenyIndex((prev) => (prev + 1) % denyMessages.length);
    setPosIndex(nextPos);
    setNoBtnPos({ position: 'fixed', ...POSITIONS[nextPos], zIndex: 100 });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>

      {/* Top ornament */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ fontSize: '64px', lineHeight: 1 }} className="animate-bounce">💖</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '48px', height: '1px', background: 'rgba(192,57,90,0.3)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c0395a', fontWeight: 700 }}>
            A Special Request
          </span>
          <div style={{ width: '48px', height: '1px', background: 'rgba(192,57,90,0.3)' }} />
        </div>
      </div>

      {/* Question */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.6rem, 5vw, 2.6rem)',
          fontWeight: 900,
          color: '#7a1535',
          margin: 0,
          lineHeight: 1.3,
        }}>
          Will you please go on a date with me?
        </h1>
        <p style={{
          fontFamily: 'Lato, sans-serif',
          fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
          color: '#b07090',
          margin: 0,
          fontStyle: 'italic',
          letterSpacing: '0.05em',
        }}>
          Your answer means everything to me 🥺
        </p>
      </div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(192,57,90,0.25))' }} />
        <span style={{ fontSize: '18px' }}>🌸</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(192,57,90,0.25))' }} />
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', width: '100%' }}>
        <ClassyButton onClick={onYes} fullWidth={false} className="px-10 sm:px-16">
          Yes, Always 💕
        </ClassyButton>

        <button
          onMouseEnter={dodgeNoButton}
          onTouchStart={(e) => { e.preventDefault(); dodgeNoButton(); }}
          onClick={dodgeNoButton}
          className="relative overflow-hidden rounded-full font-semibold uppercase tracking-[0.18em] transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95 group"
          style={{
            ...noBtnPos,
            fontFamily: 'Playfair Display, serif',
            padding: '16px 36px',
            fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
            background: 'linear-gradient(135deg, #fff0f3 0%, #ffe4ec 50%, #ffd6e7 100%)',
            border: '2px solid rgba(192,57,90,0.45)',
            color: '#7a1535',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 6px 24px rgba(192,57,90,0.2), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          <span
            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(192,57,90,0.12), transparent)' }}
          />
          <span className="relative flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            {noBtnPos.position === 'fixed' ? denyMessages[denyIndex] : 'No'}
          </span>
        </button>
      </div>

      {/* Bottom note */}
      <p style={{
        fontFamily: 'Lato, sans-serif',
        fontSize: '0.75rem',
        color: 'rgba(192,57,90,0.5)',
        letterSpacing: '0.08em',
        margin: 0,
        fontStyle: 'italic',
      }}>
        Hint: only one button works 😉
      </p>

    </div>
  );
}
