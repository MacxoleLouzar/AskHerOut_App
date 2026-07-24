import React from 'react';
import ClassyButton from './ClassyButton';

export default function LandingOverlay({ onStart, name }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 20px',
        background: 'linear-gradient(135deg, #fde8e8f8 0%, #fcd5cef8 50%, #f9b8c4f8 100%)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onStart}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: '72px', lineHeight: 1 }} className="animate-bounce">💌</div>

        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.8rem, 6vw, 3rem)',
          fontWeight: 900,
          color: '#c0395a',
          margin: 0,
        }}>
          🌸 Hi {name} ❤️
        </h1>

        <p style={{ color: '#9d4a6a', fontSize: 'clamp(0.95rem, 3vw, 1.15rem)', fontWeight: 600, margin: 0 }}>
          I have something special to ask you ✨
        </p>

        <p style={{ color: '#b07090', fontSize: '0.875rem', margin: '0 0 8px' }}>
          Tap the button below to open
        </p>

        <ClassyButton onClick={onStart}>
          Open My Message 💌
        </ClassyButton>
      </div>
    </div>
  );
}
