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

export default function ConfirmationCard({ selectedDateType, selectedDate, selectedTime, name, eventDetails, senderName, senderPhone }) {
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

        {/* Event details rows */}
        {eventDetails?.place && (
          <>
            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,182,193,0.5)', margin: 0 }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                background: 'linear-gradient(135deg, #e8527a, #c0395a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(192,57,90,0.3)',
              }}>
                <span style={{ fontSize: '20px' }}>📍</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c0395a' }}>Venue</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', fontWeight: 700, color: '#4a1020' }}>{eventDetails.place}</span>
              </div>
            </div>
          </>
        )}
        {eventDetails?.ticketPrice && (
          <>
            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,182,193,0.5)', margin: 0 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                background: 'linear-gradient(135deg, #e8527a, #c0395a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(192,57,90,0.3)',
              }}>
                <span style={{ fontSize: '20px' }}>🎟️</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c0395a' }}>Tickets</span>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', fontWeight: 700, color: '#4a1020' }}>{eventDetails.ticketPrice}</span>
              </div>
            </div>
          </>
        )}
        {eventDetails?.notes && (
          <>
            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,182,193,0.5)', margin: 0 }} />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                background: 'linear-gradient(135deg, #e8527a, #c0395a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(192,57,90,0.3)',
              }}>
                <span style={{ fontSize: '20px' }}>✨</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c0395a' }}>Details</span>
                <span style={{ fontFamily: 'Lato, sans-serif', fontSize: 'clamp(0.85rem, 2.5vw, 1rem)', color: '#4a1020', lineHeight: 1.5 }}>{eventDetails.notes}</span>
              </div>
            </div>
          </>
        )}
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

      {/* Notify sender on WhatsApp */}
      {senderPhone && (
        <button
          onClick={() => {
            const clean = senderPhone.replace(/\s+/g, '').replace(/^0/, '27');
            const dateFormatted = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
              weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
            });
            const msg = [
              `💕 ${name} said YES to your date invite!`,
              ``,
              `📅 *Date:* ${dateFormatted} at ${selectedTime}`,
              `💝 *Type:* ${selectedDateType?.title}`,
              eventDetails?.place ? `📍 *Venue:* ${eventDetails.place}` : '',
              eventDetails?.ticketPrice ? `🎟️ *Tickets:* ${eventDetails.ticketPrice}` : '',
              eventDetails?.notes ? `✨ *Notes:* ${eventDetails.notes}` : '',
              ``,
              `It's a date, ${senderName}! 🥂`,
            ].filter(Boolean).join('\n');
            window.open(`https://wa.me/${clean}?text=${encodeURIComponent(msg)}`, '_blank');
          }}
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Notify {senderName} on WhatsApp 💕
        </button>
      )}

    </div>
  );
}
