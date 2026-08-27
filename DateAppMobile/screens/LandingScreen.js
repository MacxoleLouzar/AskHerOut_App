import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Background from '../components/Background';
import ClassyButton from '../components/ClassyButton';
import { COLORS, FONTS } from '../constants';

export default function LandingScreen({ name, onStart }) {
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: -12, duration: 600, useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 600, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        <Animated.Text style={[styles.emoji, { transform: [{ translateY: bounce }] }]}>💌</Animated.Text>
        <Text style={styles.heading}>🌸 Hi {name} ❤️</Text>
        <Text style={styles.sub}>I have something special to ask you ✨</Text>
        <Text style={styles.hint}>Tap the button below to open</Text>
        <ClassyButton onPress={onStart} style={styles.btn}>Open My Message 💌</ClassyButton>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, gap: 16 },
  emoji: { fontSize: 72 },
  heading: { fontFamily: FONTS.playfair, fontSize: 34, color: COLORS.rose, textAlign: 'center', lineHeight: 42 },
  sub: { fontFamily: FONTS.latoBold, fontSize: 16, color: COLORS.roseMid, textAlign: 'center' },
  hint: { fontFamily: FONTS.lato, fontSize: 13, color: COLORS.roseLight, textAlign: 'center' },
  btn: { marginTop: 8, width: '100%' },
});
