import React, { useState } from 'react';
import ClassyButton from './ClassyButton';

export default function NameEntry({ onSubmit }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) onSubmit(name.trim());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', textAlign: 'center' }}>

      {/* Ornament */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ fontSize: '64px', lineHeight: 1 }}>💌</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '48px', height: '1px', background: 'rgba(192,57,90,0.3)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c0395a', fontWeight: 700 }}>
            Welcome
          </span>
          <div style={{ width: '48px', height: '1px', background: 'rgba(192,57,90,0.3)' }} />
        </div>
      </div>

      {/* Heading */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
          fontWeight: 900,
          color: '#7a1535',
          margin: 0,
          lineHeight: 1.2,
        }}>
          Before we begin... 🌸
        </h1>
        <p style={{
          fontFamily: 'Lato, sans-serif',
          fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
          color: '#b07090',
          margin: 0,
          fontStyle: 'italic',
        }}>
          Enter your name, my dear!
        </p>
      </div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(192,57,90,0.25))' }} />
        <span style={{ fontSize: '16px' }}>🌷</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(192,57,90,0.25))' }} />
      </div>

      {/* Input */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Enter your name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          autoFocus
          style={{
            width: '100%',
            padding: '16px 22px',
            borderRadius: '999px',
            fontFamily: 'Playfair Display, serif',
            fontWeight: 600,
            fontSize: 'clamp(1rem, 3vw, 1.15rem)',
            color: '#7a1535',
            background: 'rgba(255,240,245,0.9)',
            border: '2px solid rgba(192,57,90,0.3)',
            outline: 'none',
            textAlign: 'center',
            boxSizing: 'border-box',
            boxShadow: '0 4px 20px rgba(192,57,90,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(192,57,90,0.6)';
            e.target.style.boxShadow = '0 4px 24px rgba(192,57,90,0.2), inset 0 1px 0 rgba(255,255,255,0.8)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(192,57,90,0.3)';
            e.target.style.boxShadow = '0 4px 20px rgba(192,57,90,0.1), inset 0 1px 0 rgba(255,255,255,0.8)';
          }}
        />
        <ClassyButton onClick={handleSubmit} disabled={!name.trim()}>
          Continue 🌸
        </ClassyButton>
      </div>

    </div>
  );
}
