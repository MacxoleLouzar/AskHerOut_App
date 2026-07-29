import React, { useState } from 'react';
import BackgroundBubbles from '../components/BackgroundBubbles';
import NameEntry from '../components/NameEntry';
import LandingOverlay from '../components/LandingOverlay';
import QuestionStep from '../components/QuestionStep';
import DateTypeSelector from '../components/DateTypeSelector';
import DateTimePicker from '../components/DateTimePicker';
import ConfirmationCard from '../components/ConfirmationCard';
import { saveDateDetails } from '../services/api';

export default function DateAppPage() {
  const [step, setStep] = useState('nameEntry');
  const [name, setName] = useState('');
  const [selectedDateType, setSelectedDateType] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('18:00');
  const [eventDetails, setEventDetails] = useState({ place: '', ticketPrice: '', notes: '' });

  const handleSubmitDate = () => {
    setStep('confirmed');
    saveDateDetails({
      recipient: name,
      dateType: selectedDateType?.title,
      date: selectedDate,
      time: selectedTime,
      ...(selectedDateType?.isEvent && { eventDetails }),
    }).catch((err) => console.error('Save failed:', err));
  };

  return (
    <>
      {/* Layer 0 — gradient background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        background: 'linear-gradient(135deg, #fde8e8 0%, #fcd5ce 30%, #f9b8c4 60%, #f4a0b5 100%)',
      }} />

      {/* Layer 1 — bubbles removed from all pages */}

      {/* Layer 2 — full screen content, centered */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '520px',
          padding: '24px 20px',
          textAlign: 'center',
          margin: 'auto',
        }}>
          {step === 'nameEntry' && (
            <NameEntry onSubmit={(n) => { setName(n); setStep('landing'); }} />
          )}
          {step === 'question' && <QuestionStep onYes={() => setStep('selectDateType')} name={name} />}
          {step === 'selectDateType' && (
            <DateTypeSelector
              selectedType={selectedDateType}
              onSelect={setSelectedDateType}
              onNext={() => setStep('selectDateTime')}
            />
          )}
          {step === 'selectDateTime' && (
            <DateTimePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              isEvent={selectedDateType?.isEvent}
              selectedDateType={selectedDateType}
              eventDetails={eventDetails}
              setEventDetails={setEventDetails}
              onBack={() => setStep('selectDateType')}
              onSubmit={handleSubmitDate}
            />
          )}
          {step === 'confirmed' && (
            <ConfirmationCard
              selectedDateType={selectedDateType}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              name={name}
              eventDetails={selectedDateType?.isEvent ? eventDetails : null}
            />
          )}
        </div>
      </div>

      {/* Layer 3 — landing overlay (highest) */}
      {step === 'landing' && (
        <LandingOverlay onStart={() => setStep('question')} name={name} />
      )}
    </>
  );
}
