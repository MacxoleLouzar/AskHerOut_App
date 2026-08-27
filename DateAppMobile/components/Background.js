import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Background({ children }) {
  return (
    <LinearGradient
      colors={['#fde8e8', '#fcd5ce', '#f9b8c4', '#f4a0b5']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
});
