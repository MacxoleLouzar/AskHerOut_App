import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Background from '../components/Background';
import ClassyButton from '../components/ClassyButton';
import { COLORS, FONTS } from '../constants';

const DATE_OPTIONS = [
  { id: 'dinner',  title: 'Dinner Date',  description: 'Romantic food & candlelight', emoji: '🍽️', iconColor: '#e11d48', border: '#fda4af' },
  { id: 'coffee',  title: 'Coffee Date',  description: 'Cozy chats & cute pastries',  emoji: '☕',  iconColor: '#ea580c', border: '#fdba74' },
  { id: 'sushi',   title: 'Sushi Date',   description: 'Fresh rolls & good vibes',    emoji: '🍣',  iconColor: '#059669', border: '#6ee7b7' },
  { id: 'braai',   title: 'Braai Date',   description: 'Fire, food & good company',   emoji: '🔥',  iconColor: '#dc2626', border: '#fca5a5' },
  { id: 'church',  title: 'Church Date',  description: 'Worship together in faith',   emoji: '⛪',  iconColor: '#7c3aed', border: '#c4b5fd', isChurch: true },
  { id: 'game',    title: 'Game Date',    description: 'Arcade, board games & laughs',emoji: '🎮',  iconColor: '#4f46e5', border: '#a5b4fc' },
  { id: 'movie',   title: 'Movie Date',   description: 'Popcorn & a great film',      emoji: '🎬',  iconColor: '#2563eb', border: '#93c5fd' },
  { id: 'event',   title: 'Event Date',   description: 'Concert, show or special event', emoji: '🎟️', iconColor: '#db2777', border: '#f9a8d4', isEvent: true },
  { id: 'other',   title: 'Other',        description: 'Sleepover, painting & more...', emoji: '✨', iconColor: '#92400e', border: '#d4b896', isOther: true },
];

export default function DateTypeSelectorScreen({ selectedType, onSelect, onNext }) {
  const [customTitle, setCustomTitle] = useState('');

  const handleSelect = (opt) => {
    if (opt.isOther) {
      onSelect({ ...opt, title: customTitle.trim() || 'Other' });
    } else {
      onSelect(opt);
    }
  };

  const isOtherSelected = selectedType?.isOther;

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        <View style={styles.stepRow}>
          <Text style={styles.stepLabel}>✦ Step 1 of 2 ✦</Text>
        </View>

        <Text style={styles.heading}>Choose Our Vibe 🌸</Text>
        <Text style={styles.sub}>What kind of date sounds perfect?</Text>

        <View style={styles.grid}>
          {DATE_OPTIONS.map((opt) => {
            const isSelected = selectedType?.id === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                onPress={() => handleSelect(opt)}
                activeOpacity={0.8}
                style={[
                  styles.card,
                  { borderColor: isSelected ? opt.iconColor : opt.border },
                  isSelected && styles.cardSelected,
                ]}
              >
                <View style={styles.cardTop}>
                  <View style={[styles.iconBox, { backgroundColor: opt.iconColor }]}>
                    <Text style={{ fontSize: 18 }}>{opt.emoji}</Text>
                  </View>
                  {isSelected && <Text style={{ color: opt.iconColor, fontSize: 18 }}>✓</Text>}
                </View>
                <Text style={styles.cardTitle}>{opt.title}</Text>
                <Text style={styles.cardDesc}>{opt.description}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {isOtherSelected && (
          <View style={styles.otherField}>
            <Text style={styles.otherLabel}>✨ Describe your date idea</Text>
            <TextInput
              style={styles.otherInput}
              placeholder="e.g. Sleepover, Painting class, Hiking..."
              placeholderTextColor={COLORS.roseLight}
              value={customTitle}
              onChangeText={(t) => {
                setCustomTitle(t);
                onSelect({ ...selectedType, title: t.trim() || 'Other' });
              }}
            />
          </View>
        )}

        <ClassyButton
          onPress={onNext}
          disabled={!selectedType || (isOtherSelected && !customTitle.trim())}
          style={styles.btn}
        >
          Continue →
        </ClassyButton>

      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, padding: 20, paddingTop: 56, gap: 14 },
  stepRow: { alignItems: 'center' },
  stepLabel: { fontFamily: FONTS.latoBold, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: COLORS.rose },
  heading: { fontFamily: FONTS.playfair, fontSize: 28, color: COLORS.burgundy, textAlign: 'center' },
  sub: { fontFamily: FONTS.lato, fontSize: 13, color: COLORS.roseLight, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' },
  card: {
    width: '47%', backgroundColor: 'rgba(253,232,232,0.85)',
    borderRadius: 16, borderWidth: 2, padding: 12, gap: 6,
    shadowColor: '#c0395a', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.12, shadowRadius: 6, elevation: 3,
  },
  cardSelected: { transform: [{ scale: 1.03 }] },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  iconBox: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontFamily: FONTS.playfairBold, fontSize: 13, color: COLORS.text, lineHeight: 18 },
  cardDesc: { fontFamily: FONTS.lato, fontSize: 10, color: COLORS.textMuted, lineHeight: 14 },
  otherField: { gap: 8 },
  otherLabel: { fontFamily: FONTS.latoBold, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#92400e' },
  otherInput: {
    backgroundColor: COLORS.cardBg, borderRadius: 16, borderWidth: 2, borderColor: '#d4b896',
    paddingVertical: 14, paddingHorizontal: 18, fontFamily: FONTS.latoBold, fontSize: 15, color: COLORS.burgundy,
  },
  btn: { marginTop: 4 },
});
