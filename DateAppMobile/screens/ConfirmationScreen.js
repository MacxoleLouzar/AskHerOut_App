import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Animated } from 'react-native';
import Background from '../components/Background';
import { COLORS, FONTS } from '../constants';

const isThuli = (n) => ['thuli', 'thulie'].includes(n?.trim().toLowerCase());

const thuliMessages = [
  (n) => `I can't wait...!! 🌸\nLet's make this day unforgettable! 🥂\nMambhele Langa Mafu Ndamane Godide Ntuli kaSompisi!!\nOthandwa ndim!!`,
  (n) => `You already had my heart, now you've got my whole calendar too 💕\nEvery moment with you is worth planning for! 🌹\nMambhele Langa Mafu Ndamane Godide Ntuli kaSompisi!!\nOthandwa ndim!!`,
  (n) => `This is going to be the best date ever — because it's with you 🥰\nI've been smiling since you said yes! ✨\nMambhele Langa Mafu Ndamane Godide Ntuli kaSompisi!!\nOthandwa ndim!!`,
];

const otherMessages = [
  (n) => `Thank you for saying yes, ${n}! 🌸\nYou just made my whole world brighter — I promise to make it worth it! 💫`,
  (n) => `You have no idea how happy you just made me, ${n}! 🥰\nI'm going to make sure this is a date you'll never forget! 🌹`,
  (n) => `Honestly ${n}, you saying yes is already the best part of my day 💕\nNow let's make the actual date even better! ✨`,
];

export default function ConfirmationScreen({ selectedDateType, selectedDate, selectedTime, name, eventDetails, senderName, senderPhone }) {
  const msgIndex = React.useRef(Math.floor(Math.random() * 3)).current;
  const messages = isThuli(name) ? thuliMessages : otherMessages;
  const message = messages[msgIndex](name);

  const dateLabel = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : '';
  const timeLabel = selectedTime
    ? selectedTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : '';

  const notifySender = () => {
    if (!senderPhone) return;
    const clean = senderPhone.replace(/\s+/g, '').replace(/^0/, '27');
    const msg = [
      `💕 ${name} said YES to your date invite!`,
      ``,
      `📅 *Date:* ${dateLabel} at ${timeLabel}`,
      `💝 *Type:* ${selectedDateType?.title}`,
      eventDetails?.place ? `📍 *Venue:* ${eventDetails.place}` : '',
      eventDetails?.ticketPrice ? `🎟️ *Tickets:* ${eventDetails.ticketPrice}` : '',
      eventDetails?.notes ? `✨ *Notes:* ${eventDetails.notes}` : '',
      ``,
      `It's a date, ${senderName}! 🥂`,
    ].filter(Boolean).join('\n');
    Linking.openURL(`https://wa.me/${clean}?text=${encodeURIComponent(msg)}`);
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Heart */}
        <View style={styles.heartWrap}>
          <Text style={styles.heart}>❤️</Text>
        </View>

        <Text style={styles.heading}>It's a Date! 💕</Text>
        <Text style={styles.message}>{message}</Text>

        {/* Details card */}
        <View style={styles.card}>
          <Row label="Date Type" value={`${selectedDateType?.emoji || ''} ${selectedDateType?.title}`} />
          <Divider />
          <Row label="When" value={`${dateLabel}\nat ${timeLabel}`} />
          {eventDetails?.place && <><Divider /><Row label="Venue" value={eventDetails.place} /></>}
          {eventDetails?.ticketPrice && <><Divider /><Row label="Tickets" value={eventDetails.ticketPrice} /></>}
          {eventDetails?.notes && <><Divider /><Row label="Details" value={eventDetails.notes} /></>}
        </View>

        <Text style={styles.footer}>Screenshot this and send it to me! 😉</Text>

        {/* WhatsApp notify button */}
        {senderPhone && (
          <TouchableOpacity style={styles.waBtn} onPress={notifySender} activeOpacity={0.85}>
            <Text style={styles.waBtnText}>💬  Notify {senderName} on WhatsApp 💕</Text>
          </TouchableOpacity>
        )}

      </ScrollView>
    </Background>
  );
}

function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <View style={styles.rowIconBox}><Text style={{ fontSize: 18 }}>💝</Text></View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 1, padding: 24, paddingTop: 56, gap: 20, alignItems: 'center' },
  heartWrap: { width: 80, height: 80, borderRadius: 999, backgroundColor: 'rgba(255,182,193,0.3)', alignItems: 'center', justifyContent: 'center' },
  heart: { fontSize: 40 },
  heading: { fontFamily: FONTS.playfair, fontSize: 34, color: COLORS.rose, textAlign: 'center' },
  message: { fontFamily: FONTS.lato, fontSize: 15, color: COLORS.roseMid, textAlign: 'center', lineHeight: 24, fontStyle: 'italic' },
  card: {
    width: '100%', backgroundColor: COLORS.cardBg, borderRadius: 20,
    borderWidth: 1.5, borderColor: COLORS.cardBorder, padding: 20, gap: 14,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  rowIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#e8527a', alignItems: 'center', justifyContent: 'center' },
  rowLabel: { fontFamily: FONTS.latoBold, fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: COLORS.rose },
  rowValue: { fontFamily: FONTS.playfairBold, fontSize: 15, color: COLORS.text, lineHeight: 22 },
  divider: { height: 1, backgroundColor: 'rgba(255,182,193,0.5)' },
  footer: { fontFamily: FONTS.lato, fontSize: 13, color: COLORS.roseLight, fontStyle: 'italic', textAlign: 'center' },
  waBtn: {
    width: '100%', backgroundColor: '#25d366', borderRadius: 999,
    paddingVertical: 16, alignItems: 'center',
    shadowColor: '#25d366', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 5,
  },
  waBtnText: { fontFamily: FONTS.playfair, fontSize: 14, color: '#fff', letterSpacing: 1, textAlign: 'center' },
});
