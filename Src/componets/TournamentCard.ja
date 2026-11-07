import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../theme';

export default function TournamentCard({ tournament: t, joined, onJoin }) {
  const full = joined >= t.maxPlayers;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={2}>{t.name}</Text>
        <View style={[styles.badge, full ? styles.badgeFull : styles.badgeOpen]}>
          <Text style={[styles.badgeText, { color: full ? colors.danger : colors.success }]}>
            {full ? 'FULL' : 'OPEN'}
          </Text>
        </View>
      </View>
      <Text style={styles.meta}>🎮 {t.game}</Text>
      <Text style={styles.meta}>📅 {t.date} • {t.time}</Text>
      <Text style={styles.meta}>👥 {joined}/{t.maxPlayers} joined</Text>
      <Text style={styles.meta}>🏆 {t.prize}</Text>
      <TouchableOpacity
        style={[styles.btn, full && styles.btnDisabled]}
        onPress={onJoin}
        disabled={full}
        activeOpacity={0.8}
      >
        <Text style={styles.btnText}>{full ? 'Full' : 'Free Join'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  title: { fontSize: 16, fontWeight: '700', color: colors.text, flex: 1, marginRight: spacing.sm },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.sm },
  badgeOpen: { backgroundColor: colors.successBg },
  badgeFull: { backgroundColor: colors.dangerBg },
  badgeText: { fontSize: 11, fontWeight: '700' },
  meta: { fontSize: 12, color: colors.textMuted, marginBottom: 4 },
  btn: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: radius.md,
    marginTop: spacing.md,
    alignItems: 'center',
    minHeight: 44,
    justifyContent: 'center',
  },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});
