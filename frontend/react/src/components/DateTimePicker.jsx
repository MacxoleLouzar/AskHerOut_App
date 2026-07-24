import React from 'react';
import { Calendar as CalendarIcon, Clock, Sparkles } from 'lucide-react';
import ClassyButton from './ClassyButton';

export default function DateTimePicker({ selectedDate, setSelectedDate, selectedTime, setSelectedTime, onBack, onSubmit }) {
  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 3);

  // Ensure today's date in local time — prevents timezone off-by-one
  const fmt = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const minDate = fmt(today);
  const maxDateStr = fmt(maxDate);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'center' }}>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#c0395a' }}>
        <Sparkles size={18} />
        <span style={{ fontWeight: 900, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Step 2 of 2
        </span>
      </div>

      {/* Heading */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
          fontWeight: 900,
          color: '#7a1535',
          margin: 0,
          lineHeight: 1.2,
        }}>
          When are you free? 📅
        </h2>
        <p style={{ color: '#b07090', fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)', margin: 0 }}>
          Pick any day within the next 3 months
        </p>
      </div>

      {/* Inputs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>

        {/* Date input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#9d4a6a',
          }}>
            <CalendarIcon size={14} /> Select Date
          </label>
          <input
            type="date"
            min={minDate}
            max={maxDateStr}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 18px',
              borderRadius: '16px',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
              color: '#7a1535',
              background: 'rgba(255,228,235,0.8)',
              border: '2px solid rgba(255,182,193,0.7)',
              outline: 'none',
              boxSizing: 'border-box',
              cursor: 'pointer',
            }}
          />
          {selectedDate && new Date(selectedDate) < today.setHours(0,0,0,0) && (
            <span style={{ color: '#e11d48', fontSize: '0.78rem', fontWeight: 600 }}>
              ⚠️ Please select a future date
            </span>
          )}
        </div>

        {/* Time input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: '#9d4a6a',
          }}>
            <Clock size={14} /> Select Time
          </label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 18px',
              borderRadius: '16px',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
              color: '#7a1535',
              background: 'rgba(255,228,235,0.8)',
              border: '2px solid rgba(255,182,193,0.7)',
              outline: 'none',
              boxSizing: 'border-box',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        <ClassyButton onClick={onBack} ghost fullWidth={false} className="w-2/5">
          ← Back
        </ClassyButton>
        <ClassyButton onClick={onSubmit} disabled={!selectedDate} className="w-3/5">
          Confirm Date 🎉
        </ClassyButton>
      </div>

    </div>
  );
}
