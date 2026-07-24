import React from 'react';

const ArrowIcon = () => (
  <svg
    className="arrow-icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
    style={{ width: '18px', height: '18px', flexShrink: 0, transition: 'transform 0.3s' }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export default function ClassyButton({ children, onClick, disabled = false, ghost = false, fullWidth = true, className = '' }) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontFamily: 'Playfair Display, serif',
    fontWeight: 600,
    fontSize: 'clamp(0.85rem, 2vw, 1.1rem)',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    borderRadius: '999px',
    padding: '14px 32px',
    width: fullWidth ? '100%' : 'auto',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'transform 0.2s, box-shadow 0.2s',
    position: 'relative',
    overflow: 'hidden',
    border: ghost ? '1px solid rgba(107,26,46,0.4)' : '1px solid rgba(212,175,55,0.45)',
    background: ghost
      ? 'transparent'
      : disabled
        ? 'rgba(180,140,155,0.4)'
        : 'linear-gradient(135deg, #2d0a16 0%, #6b1a2e 50%, #2d0a16 100%)',
    color: ghost ? '#6b1a2e' : '#f5e6c8',
    boxShadow: ghost || disabled ? 'none' : '0 4px 32px rgba(45,10,22,0.45), inset 0 1px 0 rgba(212,175,55,0.3)',
  };

  return (
    <button
      className={`gradient-btn ${className}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      style={base}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.transform = 'scale(1.05)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = 'scale(0.96)'; }}
      onMouseUp={e => { if (!disabled) e.currentTarget.style.transform = 'scale(1.05)'; }}
    >
      {/* gold shimmer sweep */}
      {!ghost && !disabled && (
        <span style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)',
          transform: 'translateX(-100%) skewX(12deg)',
          transition: 'transform 0.7s',
          pointerEvents: 'none',
        }} className="shimmer" />
      )}
      <span style={{ position: 'relative' }}>{children}</span>
      {!ghost && <ArrowIcon />}
    </button>
  );
}
