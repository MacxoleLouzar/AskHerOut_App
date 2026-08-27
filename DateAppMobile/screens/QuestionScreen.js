import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Background from '../components/Background';
import ClassyButton from '../components/ClassyButton';
import { COLORS, FONTS } from '../constants';

const { width: W, height: H } = Dimensions.get('window');

const POSITIONS = [
  { top: H * 0.1, left: W * 0.1 },
  { top: H * 0.1, left: W * 0.6 },
  { top: H * 0.75, left: W * 0.1 },
  { top: H * 0.75, left: W * 0.6 },
  { top: H * 0.42, left: W * 0.04 },
  { top: H * 0.42, left: W * 0.68 },
  { top: H * 0.22, left: W * 0.35 },
  { top: H * 0.65, left: W * 0.33 },
];

const DENY = [
  'Nope! 👀 Wrong choice babe',
  'Try again! 😜 Not that one!',
  'Nice try! 🙈 Keep going...',
  "Error 404: 'No' not found 🚫",
  'Just say YES already! ❤️',
];

export default function QuestionScreen({ onYes, name }) {
  const [posIndex, setPosIndex] = useState(null);
  const [denyIndex, setDenyIndex] = useState(0);

  const dodge = () => {
    const next = posIndex === null ? 0 : (posIndex + 1) % POSITIONS.length;
    setPosIndex(next);
    setDenyIndex((d) => (d + 1) % DENY.length);
  };

  const noPos = posIndex !== null ? { position: 'absolute', ...POSITIONS[posIndex] } : {};

  return (
    <Background>
      <View style={styles.container}>

        <Text style={styles.emoji}>💖</Text>
        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.dividerLabel}>A Special Request</Text>
          <View style={styles.line} />
        </View>

        <Text style={styles.heading}>Will you please go on a date with me?</Text>
        <Text style={styles.sub}>Your answer means everything to me 🥺</Text>

        <View style={styles.flowerRow}>
          <View style={styles.lineFull} />
          <Text style={{ fontSize: 18 }}>🌸</Text>
          <View style={styles.lineFull} />
        </View>

        <View style={styles.btnRow}>
          <ClassyButton onPress={onYes} style={styles.yesBtn}>Yes, Always 💕</ClassyButton>
        </View>

        <Text style={styles.hint}>Hint: only one button works 😉</Text>
      </View>

      {/* No button — floats around screen */}
      <TouchableOpacity
        onPress={dodge}
        style={[styles.noBtn, noPos]}
        activeOpacity={0.9}
      >
        <Text style={styles.noBtnText}>
          {posIndex === null ? 'No' : DENY[denyIndex]}
        </Text>
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, gap: 20 },
  emoji: { fontSize: 64, textAlign: 'center' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' },
  line: { width: 48, height: 1, backgroundColor: 'rgba(192,57,90,0.3)' },
  lineFull: { flex: 1, height: 1, backgroundColor: 'rgba(192,57,90,0.2)' },
  dividerLabel: { fontFamily: FONTS.latoBold, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: COLORS.rose },
  heading: { fontFamily: FONTS.playfair, fontSize: 26, color: COLORS.burgundy, textAlign: 'center', lineHeight: 36 },
  sub: { fontFamily: FONTS.lato, fontSize: 14, color: COLORS.roseLight, textAlign: 'center', fontStyle: 'italic' },
  flowerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' },
  btnRow: { width: '100%', gap: 12 },
  yesBtn: { width: '100%' },
  hint: { fontFamily: FONTS.lato, fontSize: 12, color: 'rgba(192,57,90,0.5)', fontStyle: 'italic' },
  noBtn: {
    backgroundColor: 'rgba(255,240,245,0.95)',
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderWidth: 2,
    borderColor: 'rgba(192,57,90,0.4)',
    shadowColor: COLORS.rose,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 100,
  },
  noBtnText: { fontFamily: FONTS.playfair, fontSize: 14, color: COLORS.burgundy, letterSpacing: 1 },
});
