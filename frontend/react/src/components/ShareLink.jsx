import React, { useState } from 'react';
import ClassyButton from './ClassyButton';

export default function ShareLink({ senderName, recipientName, phone }) {
  const [copied, setCopied] = useState(false);

  const base = `${window.location.origin}${window.location.pathname}`;
  const params = new URLSearchParams({
    from: senderName,
    to: recipientName,
    phone: phone,
  });
  const link = `${base}?${params.toString()}`;

  const waMessage = `💌 Hi ${recipientName}! ${senderName} has something special to ask you...\n\nOpen this link to find out 🌸\n${link}`;
  const smsMessage = `💌 Hi ${recipientName}! ${senderName} has something special to ask you. Open: ${link}`;

  const openWhatsApp = () => {
    const clean = phone.replace(/\s+/g, '').replace(/^0/, '27');
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(waMessage)}`, '_blank');
  };

  const openSMS = () => {
    window.open(`sms:?body=${encodeURIComponent(smsMessage)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', textAlign: 'center' }}>

      {/* Ornament */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ fontSize: '64px', lineHeight: 1 }}>🔗</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '48px', height: '1px', background: 'rgba(192,57,90,0.3)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c0395a', fontWeight: 700 }}>
            Your Invite is Ready
          </span>
          <div style={{ width: '48px', height: '1px', background: 'rgba(192,57,90,0.3)' }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
          fontWeight: 900, color: '#7a1535', margin: 0, lineHeight: 1.2,
        }}>
          Send it to {recipientName} 💕
        </h1>
        <p style={{ fontFamily: 'Lato, sans-serif', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', color: '#b07090', margin: 0, fontStyle: 'italic' }}>
          They open the link, pick the date details & you get notified on WhatsApp
        </p>
      </div>

      {/* Link preview */}
      <div style={{
        width: '100%',
        background: 'rgba(255,228,235,0.7)',
        border: '1.5px solid rgba(255,182,193,0.6)',
        borderRadius: '16px',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        textAlign: 'left',
      }} onClick={copyLink}>
        <span style={{ flex: 1, fontSize: '0.78rem', color: '#9d4a6a', fontFamily: 'Lato, sans-serif', wordBreak: 'break-all', lineHeight: 1.4 }}>
          {link}
        </span>
        <span style={{ fontSize: '0.7rem', fontWeight: 900, color: '#c0395a', whiteSpace: 'nowrap', letterSpacing: '0.1em' }}>
          {copied ? '✅ COPIED' : '📋 COPY'}
        </span>
      </div>

      {/* Share buttons */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={openWhatsApp}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '999px',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #25d366, #128c7e)',
            color: '#fff',
            fontFamily: 'Playfair Display, serif',
            fontWeight: 900,
            fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 6px 20px rgba(37,211,102,0.35)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Send via WhatsApp
        </button>

        <button
          onClick={openSMS}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '999px',
            border: '2px solid rgba(192,57,90,0.4)',
            cursor: 'pointer',
            background: 'rgba(255,240,245,0.9)',
            color: '#7a1535',
            fontFamily: 'Playfair Display, serif',
            fontWeight: 900,
            fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
            letterSpacing: '0.08em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          Send via SMS
        </button>
      </div>

      <p style={{ fontFamily: 'Lato, sans-serif', fontSize: '0.78rem', color: '#b07090', margin: 0, fontStyle: 'italic' }}>
        When they confirm the date, you'll receive a WhatsApp message 💕
      </p>
    </div>
  );
}
