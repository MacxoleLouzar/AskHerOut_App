import React from 'react';
import { Calendar as CalendarIcon, Clock, Sparkles, MapPin, DollarSign } from 'lucide-react';
import ClassyButton from './ClassyButton';

const inputStyle = {
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
};

const labelStyle = {
  display: 'flex', alignItems: 'center', gap: '8px',
  fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.18em',
  textTransform: 'uppercase', color: '#9d4a6a',
};

export default function DateTimePicker({
  selectedDate, setSelectedDate,
  selectedTime, setSelectedTime,
  eventDetails, setEventDetails,
  isEvent, selectedDateType, onBack, onSubmit,
}) {
  const now = new Date();
  const fmt = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const minDate = fmt(now);
  const maxDate = fmt(new Date(now.getFullYear(), now.getMonth() + 3, now.getDate()));

  const isChurch = selectedDateType?.id === 'church';

  const isSunday = (dateStr) => {
    if (!dateStr) return true;
    return new Date(dateStr + 'T00:00:00').getDay() === 0;
  };

  const isPast = (dateStr) => {
    if (!dateStr) return false;
    return new Date(dateStr + 'T00:00:00') < new Date(minDate + 'T00:00:00');
  };

  const isValid = selectedDate && !isPast(selectedDate) && (!isEvent || (eventDetails?.place?.trim())) && (!isChurch || isSunday(selectedDate));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'center' }}>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#c0395a' }}>
        <Sparkles size={18} />
        <span style={{ fontWeight: 900, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Step 2 of 2
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h2 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
          fontWeight: 900, color: '#7a1535', margin: 0, lineHeight: 1.2,
        }}>
          {isEvent ? 'Event Details 🎟️' : 'When are you free? 📅'}
        </h2>
        <p style={{ color: '#b07090', fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)', margin: 0 }}>
          {isEvent ? 'Share the event info with her' : 'Pick any day within the next 3 months'}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>

        {/* Date */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={labelStyle}><CalendarIcon size={14} /> Select Date {isChurch && <span style={{ color: '#7c3aed', fontSize: '0.65rem' }}>— Sundays only ⛪</span>}</label>
          <input
            type="date"
            min={minDate}
            max={maxDate}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              ...inputStyle,
              border: selectedDate && isPast(selectedDate)
                ? '2px solid #e11d48'
                : '2px solid rgba(255,182,193,0.7)',
            }}
          />
          {selectedDate && isPast(selectedDate) && (
            <span style={{ color: '#e11d48', fontSize: '0.78rem', fontWeight: 600 }}>
              ⚠️ You can't pick a date in the past
            </span>
          )}
          {isChurch && selectedDate && !isPast(selectedDate) && !isSunday(selectedDate) && (
            <span style={{ color: '#7c3aed', fontSize: '0.78rem', fontWeight: 600 }}>
              ⛪ Church dates must be on a Sunday
            </span>
          )}
        </div>

        {/* Time */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={labelStyle}><Clock size={14} /> Select Time</label>
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Event-only fields */}
        {isEvent && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={labelStyle}><MapPin size={14} /> Venue / Place</label>
              <input
                type="text"
                placeholder="e.g. The Lyric Theatre, Joburg"
                value={eventDetails?.place || ''}
                onChange={(e) => setEventDetails(p => ({ ...p, place: e.target.value }))}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={labelStyle}><DollarSign size={14} /> Ticket Price (optional)</label>
              <input
                type="text"
                placeholder="e.g. R350 per person"
                value={eventDetails?.ticketPrice || ''}
                onChange={(e) => setEventDetails(p => ({ ...p, ticketPrice: e.target.value }))}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={labelStyle}><Sparkles size={14} /> Extra Details (optional)</label>
              <textarea
                placeholder="e.g. Dress code, what to bring, etc."
                value={eventDetails?.notes || ''}
                onChange={(e) => setEventDetails(p => ({ ...p, notes: e.target.value }))}
                rows={3}
                style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
              />
            </div>
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <ClassyButton onClick={onBack} ghost fullWidth={false} className="w-2/5">
          ← Back
        </ClassyButton>
        <ClassyButton onClick={onSubmit} disabled={!isValid} className="w-3/5">
          Confirm Date 🎉
        </ClassyButton>
      </div>

    </div>
  );
}
