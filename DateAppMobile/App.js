import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts, PlayfairDisplay_700Bold, PlayfairDisplay_900Black } from '@expo-google-fonts/playfair-display';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';

import NameEntryScreen from './screens/NameEntryScreen';
import ShareLinkScreen from './screens/ShareLinkScreen';
import LandingScreen from './screens/LandingScreen';
import QuestionScreen from './screens/QuestionScreen';
import DateTypeSelectorScreen from './screens/DateTypeSelectorScreen';
import DateTimePickerScreen from './screens/DateTimePickerScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay_900Black,
    PlayfairDisplay_700Bold,
    Lato_400Regular,
    Lato_700Bold,
  });

  const [step, setStep] = useState('nameEntry');
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [name, setName] = useState(''); // recipient
  const [selectedDateType, setSelectedDateType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [eventDetails, setEventDetails] = useState({ place: '', ticketPrice: '', notes: '' });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9b8c4' }}>
        <ActivityIndicator size="large" color="#c0395a" />
      </View>
    );
  }

  return (
    <>
      {step === 'nameEntry' && (
        <NameEntryScreen
          onSubmit={({ senderName: sn, recipientName: rn, phone }) => {
            setSenderName(sn);
            setSenderPhone(phone);
            setName(rn);
            setStep('shareLink');
          }}
        />
      )}

      {step === 'shareLink' && (
        <ShareLinkScreen
          senderName={senderName}
          recipientName={name}
          phone={senderPhone}
        />
      )}

      {step === 'landing' && (
        <LandingScreen name={name} onStart={() => setStep('question')} />
      )}

      {step === 'question' && (
        <QuestionScreen name={name} onYes={() => setStep('selectDateType')} />
      )}

      {step === 'selectDateType' && (
        <DateTypeSelectorScreen
          selectedType={selectedDateType}
          onSelect={setSelectedDateType}
          onNext={() => setStep('selectDateTime')}
        />
      )}

      {step === 'selectDateTime' && (
        <DateTimePickerScreen
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          isEvent={selectedDateType?.isEvent}
          selectedDateType={selectedDateType}
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
          onBack={() => setStep('selectDateType')}
          onSubmit={() => setStep('confirmed')}
        />
      )}

      {step === 'confirmed' && (
        <ConfirmationScreen
          selectedDateType={selectedDateType}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          name={name}
          eventDetails={selectedDateType?.isEvent ? eventDetails : null}
          senderName={senderName}
          senderPhone={senderPhone}
        />
      )}
    </>
  );
}
