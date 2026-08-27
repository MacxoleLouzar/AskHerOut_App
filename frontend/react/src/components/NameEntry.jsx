import React, { useState } from 'react';
import ClassyButton from './ClassyButton';

export default function NameEntry({ onSubmit }) {
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('');

  const isValid = senderName.trim() && recipientName.trim() && phone.trim().length >= 7;

  const handleSubmit = () => {
    if (isValid) onSubmit({ senderName: senderName.trim(), recipientName: recipientName.trim(), phone: phone.trim() });
  };

  const inputStyle = {
    width: '100%',
    padding: '16px 22px',
    borderRadius: '999px',
    fontFamily: 'Playfair Display, serif',
    fontWeight: 600,
    fontSize: 'clamp(1rem, 3vw, 1.1rem)',
    color: '#7a1535',
    background: 'rgba(255,240,245,0.9)',
    border: '2px solid rgba(192,57,90,0.3)',
    outline: 'none',
    textAlign: 'center',
    boxSizing: 'border-box',
    boxShadow: '0 4px 20px rgba(192,57,90,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
  };

  const focus = (e) => {
    e.target.style.borderColor = 'rgba(192,57,90,0.6)';
    e.target.style.boxShadow = '0 4px 24px rgba(192,57,90,0.2), inset 0 1px 0 rgba(255,255,255,0.8)';
  };
  const blur = (e) => {
    e.target.style.borderColor = 'rgba(192,57,90,0.3)';
    e.target.style.boxShadow = '0 4px 20px rgba(192,57,90,0.1), inset 0 1px 0 rgba(255,255,255,0.8)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', textAlign: 'center' }}>

      {/* Ornament */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ fontSize: '64px', lineHeight: 1 }}>💌</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '48px', height: '1px', background: 'rgba(192,57,90,0.3)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c0395a', fontWeight: 700 }}>
            Create Your Date Invite
          </span>
          <div style={{ width: '48px', height: '1px', background: 'rgba(192,57,90,0.3)' }} />
        </div>
      </div>

      {/* Heading */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
          fontWeight: 900, color: '#7a1535', margin: 0, lineHeight: 1.2,
        }}>
          Let's set this up 🌸
        </h1>
        <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', color: '#b07090', margin: 0, fontStyle: 'italic' }}>
          Fill in the details to create your invite link
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(192,57,90,0.25))' }} />
        <span style={{ fontSize: '16px' }}>🌷</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(192,57,90,0.25))' }} />
      </div>

      {/* Fields */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <label style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9d4a6a', paddingLeft: '8px' }}>
            Your Name (Sender)
          </label>
          <input
            type="text"
            placeholder="Your name..."
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            onFocus={focus} onBlur={blur}
            autoFocus
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <label style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9d4a6a', paddingLeft: '8px' }}>
            Their Name (Recipient)
          </label>
          <input
            type="text"
            placeholder="Their name..."
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            onFocus={focus} onBlur={blur}
            style={inputStyle}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
          <label style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9d4a6a', paddingLeft: '8px' }}>
            Your WhatsApp Number
          </label>
          <input
            type="tel"
            placeholder="+27 71 234 5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            onFocus={focus} onBlur={blur}
            style={inputStyle}
          />
          <span style={{ fontSize: '0.7rem', color: '#b07090', paddingLeft: '8px', fontStyle: 'italic' }}>
            They'll send their confirmation here 💕
          </span>
        </div>

        <ClassyButton onClick={handleSubmit} disabled={!isValid}>
          Create My Invite 💌
        </ClassyButton>
      </div>

    </div>
  );
}
