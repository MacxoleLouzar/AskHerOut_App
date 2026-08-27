import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS, FONTS } from '../constants';

export default function ClassyButton({ children, onPress, disabled = false, ghost = false, style }) {
  return (
    <TouchableOpacity
      onPress={disabled ? null : onPress}
      activeOpacity={disabled ? 1 : 0.8}
      style={[
        styles.btn,
        ghost && styles.ghost,
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.label, ghost && styles.ghostLabel, disabled && styles.disabledLabel]}>
        {children}
      </Text>
      {!ghost && (
        <Text style={[styles.arrow, disabled && styles.disabledLabel]}>→</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.burgundyDark,
    borderRadius: 999,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: 'rgba(212,175,55,0.45)',
    shadowColor: COLORS.burgundyDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 6,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'rgba(107,26,46,0.4)',
    shadowOpacity: 0,
    elevation: 0,
  },
  disabled: {
    opacity: 0.4,
    shadowOpacity: 0,
    elevation: 0,
  },
  label: {
    fontFamily: FONTS.playfair,
    fontSize: 15,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#f5e6c8',
  },
  ghostLabel: {
    color: COLORS.burgundy,
  },
  disabledLabel: {
    color: '#b8a0a8',
  },
  arrow: {
    color: '#f5e6c8',
    fontSize: 18,
  },
});
