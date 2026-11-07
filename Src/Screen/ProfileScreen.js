import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../storage';
import { colors, spacing, radius } from '../theme';

export default function ProfileScreen() {
  const [stats, setStats] = useState({ players: 0, regs: 0, top: '—' });

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const [p, r] = await Promise.all([db.getPlayers(), db.getRegistrations()]);
        const top = p.length
          ? p.slice().sort((a, b) => b.kills - a.kills)[0].name
          : '—';
        setStats({ players: p.length, regs: r.length, top });
      })();
    }, [])
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: spacing.lg }}
    >
      <View style={styles.card}>
        <Text style={styles.heading}>📊 Stats</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Total players</Text>
          <Text style={styles.value}>{stats.players}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total registrations</Text>
          <Text style={styles.value}>{stats.regs}</Text>
        </View>
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Text style={styles.label}>Top player</Text>
          <Text style={styles.value}>{stats.top}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>ℹ️ About</Text>
        <Text style={styles.para}>
          Free entry esports tournaments for Free Fire MAX & BGMI.
        </Text>
        <Text style={styles.para}>
          Prizes are app coins — no cash value, no withdrawal.
        </Text>
        <Text style={styles.paraMuted}>18+ recommended. Skill-based only.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heading: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  label: { color: colors.textMuted, fontSize: 13 },
  value: { color: colors.text, fontWeight: '600', fontSize: 13 },
  para: { color: colors.textMuted, fontSize: 13, lineHeight: 20, marginBottom: spacing.sm },
  paraMuted: { color: colors.textDim, fontSize: 12, fontStyle: 'italic' },
});
