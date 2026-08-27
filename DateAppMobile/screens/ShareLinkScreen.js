import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Linking, Share } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Background from '../components/Background';
import { COLORS, FONTS } from '../constants';

export default function ShareLinkScreen({ senderName, recipientName, phone }) {
  const [copied, setCopied] = useState(false);

  const base = 'https://MacxoleLouzar.github.io/AskHerOut_App';
  const params = `?from=${encodeURIComponent(senderName)}&to=${encodeURIComponent(recipientName)}&phone=${encodeURIComponent(phone)}`;
  const link = `${base}/${params}`;

  const waMessage = `💌 Hi ${recipientName}! ${senderName} has something special to ask you...\n\nOpen this link to find out 🌸\n${link}`;
  const smsMessage = `💌 Hi ${recipientName}! ${senderName} has something special to ask you. Open: ${link}`;

  const openWhatsApp = () => {
    const clean = phone.replace(/\s+/g, '').replace(/^0/, '27');
    Linking.openURL(`https://wa.me/${clean}?text=${encodeURIComponent(waMessage)}`);
  };

  const openSMS = () => {
    Linking.openURL(`sms:?body=${encodeURIComponent(smsMessage)}`);
  };

  const copyLink = async () => {
    await Clipboard.setStringAsync(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = () => {
    Share.share({ message: waMessage, url: link });
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.scroll}>

        <Text style={styles.emoji}>🔗</Text>
        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.dividerLabel}>Your Invite is Ready</Text>
          <View style={styles.line} />
        </View>

        <Text style={styles.heading}>Send it to {recipientName} 💕</Text>
        <Text style={styles.sub}>They open the link, pick the date & you get notified on WhatsApp</Text>

        {/* Link preview */}
        <TouchableOpacity style={styles.linkBox} onPress={copyLink} activeOpacity={0.7}>
          <Text style={styles.linkText} numberOfLines={2}>{link}</Text>
          <Text style={styles.copyLabel}>{copied ? '✅ COPIED' : '📋 COPY'}</Text>
        </TouchableOpacity>

        {/* WhatsApp */}
        <TouchableOpacity style={styles.waBtn} onPress={openWhatsApp} activeOpacity={0.85}>
          <Text style={styles.waBtnText}>💬  Send via WhatsApp</Text>
        </TouchableOpacity>

        {/* SMS */}
        <TouchableOpacity style={styles.smsBtn} onPress={openSMS} activeOpacity={0.85}>
          <Text style={styles.smsBtnText}>✉️  Send via SMS</Text>
        </TouchableOpacity>

        {/* Native share */}
        <TouchableOpacity style={styles.shareBtn} onPress={shareLink} activeOpacity={0.85}>
          <Text style={styles.smsBtnText}>📤  Share Link</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>When they confirm the date, you'll receive a WhatsApp message 💕</Text>

      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, alignItems: 'center', padding: 28, paddingTop: 60, gap: 16 },
  emoji: { fontSize: 64, textAlign: 'center' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, width: '100%' },
  line: { width: 48, height: 1, backgroundColor: 'rgba(192,57,90,0.3)' },
  dividerLabel: { fontFamily: FONTS.latoBold, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: COLORS.rose },
  heading: { fontFamily: FONTS.playfair, fontSize: 28, color: COLORS.burgundy, textAlign: 'center', lineHeight: 36 },
  sub: { fontFamily: FONTS.lato, fontSize: 13, color: COLORS.roseLight, textAlign: 'center', fontStyle: 'italic' },
  linkBox: {
    width: '100%', backgroundColor: COLORS.cardBg, borderRadius: 16,
    borderWidth: 1.5, borderColor: COLORS.cardBorder,
    padding: 14, flexDirection: 'row', alignItems: 'center', gap: 10,
  },
  linkText: { flex: 1, fontFamily: FONTS.lato, fontSize: 12, color: COLORS.roseMid, lineHeight: 18 },
  copyLabel: { fontFamily: FONTS.latoBold, fontSize: 10, color: COLORS.rose, letterSpacing: 1 },
  waBtn: {
    width: '100%', backgroundColor: '#25d366', borderRadius: 999,
    paddingVertical: 16, alignItems: 'center',
    shadowColor: '#25d366', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 5,
  },
  waBtnText: { fontFamily: FONTS.playfair, fontSize: 15, color: '#fff', letterSpacing: 1 },
  smsBtn: {
    width: '100%', borderRadius: 999, paddingVertical: 16, alignItems: 'center',
    borderWidth: 2, borderColor: 'rgba(192,57,90,0.4)', backgroundColor: 'rgba(255,240,245,0.9)',
  },
  shareBtn: {
    width: '100%', borderRadius: 999, paddingVertical: 16, alignItems: 'center',
    borderWidth: 2, borderColor: 'rgba(192,57,90,0.4)', backgroundColor: 'rgba(255,240,245,0.9)',
  },
  smsBtnText: { fontFamily: FONTS.playfair, fontSize: 15, color: COLORS.burgundy, letterSpacing: 1 },
  footer: { fontFamily: FONTS.lato, fontSize: 12, color: COLORS.roseLight, textAlign: 'center', fontStyle: 'italic', marginTop: 8 },
});
