import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Background from '../components/Background';
import ClassyButton from '../components/ClassyButton';
import { COLORS, FONTS } from '../constants';

export default function DateTimePickerScreen({
  selectedDate, setSelectedDate,
  selectedTime, setSelectedTime,
  eventDetails, setEventDetails,
  isEvent, selectedDateType, onBack, onSubmit,
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const isChurch = selectedDateType?.id === 'church';

  const isSunday = (d) => d?.getDay() === 0;
  const isPast = (d) => d && d < today;

  const dateLabel = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : 'Tap to select date';

  const timeLabel = selectedTime
    ? selectedTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : 'Tap to select time';

  const isValid = selectedDate && !isPast(selectedDate)
    && (!isChurch || isSunday(selectedDate))
    && (!isEvent || eventDetails?.place?.trim());

  const onDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) setSelectedDate(date);
  };

  const onTimeChange = (event, time) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (time) setSelectedTime(time);
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        <View style={styles.stepRow}>
          <Text style={styles.stepLabel}>✦ Step 2 of 2 ✦</Text>
        </View>

        <Text style={styles.heading}>{isEvent ? 'Event Details 🎟️' : 'When are you free? 📅'}</Text>
        <Text style={styles.sub}>{isEvent ? 'Share the event info with her' : 'Pick any day within the next 3 months'}</Text>

        {/* Date picker */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>
            📅 Select Date{isChurch ? '  —  Sundays only ⛪' : ''}
          </Text>
          <TouchableOpacity
            style={[styles.pickerBtn, selectedDate && isPast(selectedDate) && styles.pickerBtnError]}
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.8}
          >
            <Text style={[styles.pickerText, !selectedDate && styles.pickerPlaceholder]}>{dateLabel}</Text>
          </TouchableOpacity>
          {selectedDate && isPast(selectedDate) && (
            <Text style={styles.errorText}>⚠️ You can't pick a date in the past</Text>
          )}
          {isChurch && selectedDate && !isPast(selectedDate) && !isSunday(selectedDate) && (
            <Text style={styles.churchError}>⛪ Church dates must be on a Sunday</Text>
          )}
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate || today}
            mode="date"
            minimumDate={today}
            maximumDate={maxDate}
            onChange={onDateChange}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          />
        )}

        {/* Time picker */}
        <View style={styles.fieldGroup}>
          <Text style={styles.label}>🕐 Select Time</Text>
          <TouchableOpacity style={styles.pickerBtn} onPress={() => setShowTimePicker(true)} activeOpacity={0.8}>
            <Text style={[styles.pickerText, !selectedTime && styles.pickerPlaceholder]}>{timeLabel}</Text>
          </TouchableOpacity>
        </View>

        {showTimePicker && (
          <DateTimePicker
            value={selectedTime || new Date()}
            mode="time"
            onChange={onTimeChange}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          />
        )}

        {/* Event fields */}
        {isEvent && (
          <>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>📍 Venue / Place</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. The Lyric Theatre, Joburg"
                placeholderTextColor={COLORS.roseLight}
                value={eventDetails?.place || ''}
                onChangeText={(t) => setEventDetails(p => ({ ...p, place: t }))}
              />
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>🎟️ Ticket Price (optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. R350 per person"
                placeholderTextColor={COLORS.roseLight}
                value={eventDetails?.ticketPrice || ''}
                onChangeText={(t) => setEventDetails(p => ({ ...p, ticketPrice: t }))}
              />
            </View>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>✨ Extra Details (optional)</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="e.g. Dress code, what to bring..."
                placeholderTextColor={COLORS.roseLight}
                value={eventDetails?.notes || ''}
                onChangeText={(t) => setEventDetails(p => ({ ...p, notes: t }))}
                multiline
                numberOfLines={3}
              />
            </View>
          </>
        )}

        {/* Buttons */}
        <View style={styles.btnRow}>
          <ClassyButton onPress={onBack} ghost style={styles.backBtn}>← Back</ClassyButton>
          <ClassyButton onPress={onSubmit} disabled={!isValid} style={styles.confirmBtn}>Confirm 🎉</ClassyButton>
        </View>

      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, padding: 24, paddingTop: 56, gap: 20 },
  stepRow: { alignItems: 'center' },
  stepLabel: { fontFamily: FONTS.latoBold, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: COLORS.rose },
  heading: { fontFamily: FONTS.playfair, fontSize: 28, color: COLORS.burgundy, textAlign: 'center', lineHeight: 36 },
  sub: { fontFamily: FONTS.lato, fontSize: 13, color: COLORS.roseLight, textAlign: 'center' },
  fieldGroup: { gap: 8 },
  label: { fontFamily: FONTS.latoBold, fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: COLORS.roseMid },
  pickerBtn: {
    backgroundColor: COLORS.cardBg, borderRadius: 16, borderWidth: 2,
    borderColor: 'rgba(255,182,193,0.7)', paddingVertical: 16, paddingHorizontal: 18,
  },
  pickerBtnError: { borderColor: '#e11d48' },
  pickerText: { fontFamily: FONTS.playfairBold, fontSize: 15, color: COLORS.burgundy },
  pickerPlaceholder: { color: COLORS.roseLight, fontFamily: FONTS.lato },
  errorText: { fontFamily: FONTS.latoBold, fontSize: 12, color: '#e11d48' },
  churchError: { fontFamily: FONTS.latoBold, fontSize: 12, color: '#7c3aed' },
  input: {
    backgroundColor: COLORS.cardBg, borderRadius: 16, borderWidth: 2,
    borderColor: 'rgba(255,182,193,0.7)', paddingVertical: 14, paddingHorizontal: 18,
    fontFamily: FONTS.latoBold, fontSize: 15, color: COLORS.burgundy,
  },
  textarea: { minHeight: 90, textAlignVertical: 'top' },
  btnRow: { flexDirection: 'row', gap: 12, marginTop: 4 },
  backBtn: { flex: 2 },
  confirmBtn: { flex: 3 },
});
