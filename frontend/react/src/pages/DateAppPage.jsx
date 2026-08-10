import React, { useState, useEffect } from 'react';
import NameEntry from '../components/NameEntry';
import LandingOverlay from '../components/LandingOverlay';
import QuestionStep from '../components/QuestionStep';
import DateTypeSelector from '../components/DateTypeSelector';
import DateTimePicker from '../components/DateTimePicker';
import ConfirmationCard from '../components/ConfirmationCard';
import ShareLink from '../components/ShareLink';
import { saveDateDetails } from '../services/api';

export default function DateAppPage() {
  const [step, setStep] = useState(null); // null until we read URL params
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [name, setName] = useState(''); // recipient name
  const [selectedDateType, setSelectedDateType] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('18:00');
  const [eventDetails, setEventDetails] = useState({ place: '', ticketPrice: '', notes: '' });

  // On mount — check if this is a receiver opening a shared link
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');
    const to = params.get('to');
    const phone = params.get('phone');

    if (from && to && phone) {
      // Receiver flow — skip sign-up, go straight to landing
      setSenderName(from);
      setSenderPhone(phone);
      setName(to);
      setStep('landing');
    } else {
      // Sender flow — show sign-up
      setStep('nameEntry');
    }
  }, []);

  const handleSubmitDate = () => {
    setStep('confirmed');
    saveDateDetails({
      recipient: name,
      sender: senderName,
      dateType: selectedDateType?.title,
      date: selectedDate,
      time: selectedTime,
      ...(selectedDateType?.isEvent && { eventDetails }),
    }).catch((err) => console.error('Save failed:', err));
  };

  if (step === null) return null; // wait for URL check

  return (
    <>
      {/* Background */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'linear-gradient(135deg, #fde8e8 0%, #fcd5ce 30%, #f9b8c4 60%, #f4a0b5 100%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center', overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: '520px', padding: '24px 20px', textAlign: 'center', margin: 'auto' }}>

          {step === 'nameEntry' && (
            <NameEntry onSubmit={({ senderName: sn, recipientName: rn, phone }) => {
              setSenderName(sn);
              setSenderPhone(phone);
              setName(rn);
              setStep('shareLink');
            }} />
          )}

          {step === 'shareLink' && (
            <ShareLink
              senderName={senderName}
              recipientName={name}
              phone={senderPhone}
            />
          )}

          {step === 'question' && (
            <QuestionStep onYes={() => setStep('selectDateType')} name={name} />
          )}

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
              senderName={senderName}
              senderPhone={senderPhone}
            />
          )}

        </div>
      </div>

      {/* Landing overlay — receiver sees this first */}
      {step === 'landing' && (
        <LandingOverlay onStart={() => setStep('question')} name={name} />
      )}
    </>
  );
}
