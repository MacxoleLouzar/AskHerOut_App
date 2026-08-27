import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Background from '../components/Background';
import ClassyButton from '../components/ClassyButton';
import { COLORS, FONTS } from '../constants';

export default function NameEntryScreen({ onSubmit }) {
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [phone, setPhone] = useState('');

  const isValid = senderName.trim() && recipientName.trim() && phone.trim().length >= 7;

  return (
    <Background>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

          {/* Ornament */}
          <Text style={styles.emoji}>💌</Text>
          <View style={styles.dividerRow}>
            <View style={styles.line} />
            <Text style={styles.dividerLabel}>Create Your Date Invite</Text>
            <View style={styles.line} />
          </View>

          {/* Heading */}
          <Text style={styles.heading}>Let's set this up 🌸</Text>
          <Text style={styles.sub}>Fill in the details to create your invite link</Text>

          <View style={styles.flowerRow}>
            <View style={styles.lineFull} />
            <Text style={{ fontSize: 16 }}>🌷</Text>
            <View style={styles.lineFull} />
          </View>

          {/* Fields */}
          <View style={styles.fields}>
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Your Name (Sender)</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name..."
                placeholderTextColor={COLORS.roseLight}
                value={senderName}
                onChangeText={setSenderName}
                autoFocus
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Her Name (Recipient)</Text>
              <TextInput
                style={styles.input}
                placeholder="Her name..."
                placeholderTextColor={COLORS.roseLight}
                value={recipientName}
                onChangeText={setRecipientName}
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.label}>Your WhatsApp Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+27 71 234 5678"
                placeholderTextColor={COLORS.roseLight}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <Text style={styles.hint}>She'll send her confirmation here 💕</Text>
            </View>

            <ClassyButton onPress={() => isValid && onSubmit({ senderName: senderName.trim(), recipientName: recipientName.trim(), phone: phone.trim() })} disabled={!isValid}>
              Create My Invite 💌
            </ClassyButton>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, alignItems: 'center', padding: 28, paddingTop: 60, gap: 16 },
  emoji: { fontSize: 64, textAlign: 'center' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' },
  line: { width: 48, height: 1, backgroundColor: 'rgba(192,57,90,0.3)' },
  lineFull: { flex: 1, height: 1, backgroundColor: 'rgba(192,57,90,0.2)' },
  dividerLabel: { fontFamily: FONTS.latoBold, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: COLORS.rose },
  heading: { fontFamily: FONTS.playfair, fontSize: 30, color: COLORS.burgundy, textAlign: 'center', lineHeight: 38 },
  sub: { fontFamily: FONTS.lato, fontSize: 14, color: COLORS.roseLight, textAlign: 'center', fontStyle: 'italic' },
  flowerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' },
  fields: { width: '100%', gap: 16 },
  fieldGroup: { gap: 6 },
  label: { fontFamily: FONTS.latoBold, fontSize: 10, letterSpacing: 2.5, textTransform: 'uppercase', color: COLORS.roseMid, paddingLeft: 4 },
  input: {
    backgroundColor: 'rgba(255,240,245,0.9)',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(192,57,90,0.3)',
    paddingVertical: 14,
    paddingHorizontal: 22,
    fontFamily: FONTS.playfairBold,
    fontSize: 16,
    color: COLORS.burgundy,
    textAlign: 'center',
  },
  hint: { fontFamily: FONTS.lato, fontSize: 11, color: COLORS.roseLight, fontStyle: 'italic', paddingLeft: 4 },
});
