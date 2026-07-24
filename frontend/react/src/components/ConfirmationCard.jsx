import React from 'react';
import { Heart, Calendar as CalendarIcon } from 'lucide-react';

const isThuli = (n) => ['thuli', 'thulie'].includes(n?.trim().toLowerCase());

const thuliMessages = [
  <>I can't wait...!! 🌸<br />Let's make this day unforgettable! 🥂<br /><em style={{ color: '#7a1535', fontStyle: 'italic' }}>Mambhele Langa Mafu Ndamane Godide Ntuli kaSompisi!!</em><br />Othandwa ndim!!</>,
  <>You already had my heart, now you've got my whole calendar too 💕<br />Every moment with you is worth planning for! 🌹<br /><em style={{ color: '#7a1535', fontStyle: 'italic' }}>Mambhele Langa Mafu Ndamane Godide Ntuli kaSompisi!!</em><br />Othandwa ndim!!</>,
  <>This is going to be the best date ever — because it's with you 🥰<br />I've been smiling since you said yes! ✨<br /><em style={{ color: '#7a1535', fontStyle: 'italic' }}>Mambhele Langa Mafu Ndamane Godide Ntuli kaSompisi!!</em><br />Othandwa ndim!!</>,
];

const otherMessages = [
  (n) => <>Thank you for saying yes, {n}! 🌸<br />You just made my whole world brighter — I promise to make it worth it! 💫</>,
  (n) => <>You have no idea how happy you just made me, {n}! 🥰<br />I'm going to make sure this is a date you'll never forget! 🌹</>,
  (n) => <>Honestly {n}, you saying yes is already the best part of my day 💕<br />Now let's make the actual date even better! ✨</>,
];

export default function ConfirmationCard({ selectedDateType, selectedDate, selectedTime, name }) {
  const msgIndex = React.useRef(Math.floor(Math.random() * (isThuli(name) ? thuliMessages.length : otherMessages.length))).current;
  const message = isThuli(name) ? thuliMessages[msgIndex] : otherMessages[msgIndex](name);
  const Icon = selectedDateType?.icon;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'center' }}>

      {/* Icon */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          className="animate-bounce"
          style={{ background: 'rgba(255,182,193,0.3)', borderRadius: '999px', padding: '16px', display: 'inline-flex' }}
        >
          <Heart style={{ width: '48px', height: '48px', color: '#c0395a', fill: '#c0395a' }} />
        </div>
      </div>

      {/* Heading */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
          fontWeight: 900,
          color: '#c0395a',
          margin: 0,
          lineHeight: 1.2,
        }}>
          It's a Date! 💕
        </h1>

        <p style={{
          fontFamily: 'Lato, sans-serif',
          fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
          color: '#9d6070',
          lineHeight: 1.7,
          margin: 0,
        }}>
          {message}
        </p>
      </div>

      {/* Details card */}
      <div style={{
        background: 'rgba(255,228,235,0.7)',
        border: '1.5px solid rgba(255,182,193,0.6)',
        borderRadius: '20px',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        textAlign: 'left',
      }}>

        {/* Date Type row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {Icon && (
            <div style={{
              width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
              background: 'linear-gradient(135deg, #e8527a, #c0395a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(192,57,90,0.3)',
            }}>
              <Icon style={{ width: '22px', height: '22px', color: '#fff' }} />
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{
              fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#c0395a',
            }}>
              Date Type
            </span>
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1rem, 3vw, 1.2rem)',
              fontWeight: 700, color: '#4a1020',
            }}>
              {selectedDateType?.title}
            </span>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,182,193,0.5)', margin: 0 }} />

        {/* When row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
            background: 'linear-gradient(135deg, #e8527a, #c0395a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(192,57,90,0.3)',
          }}>
            <CalendarIcon style={{ width: '22px', height: '22px', color: '#fff' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{
              fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.15em',
              textTransform: 'uppercase', color: '#c0395a',
            }}>
              When
            </span>
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              fontWeight: 700, color: '#4a1020', lineHeight: 1.4,
            }}>
              {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
                weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
              })}
              <br />
              <span style={{ color: '#c0395a' }}>at {selectedTime}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p style={{
        fontFamily: 'Lato, sans-serif',
        fontSize: '0.85rem',
        fontStyle: 'italic',
        color: '#b07090',
        margin: 0,
      }}>
        Screenshot this and send it to me! 😉
      </p>

    </div>
  );
}
