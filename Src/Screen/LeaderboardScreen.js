import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../storage';
import { colors, spacing } from '../theme';

export default function LeaderboardScreen() {
  const [players, setPlayers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    const p = await db.getPlayers();
    setPlayers(p.slice().sort((a, b) => b.kills - a.kills));
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        keyExtractor={(p) => p.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={<Text style={styles.empty}>Abhi koi player nahi.</Text>}
        contentContainerStyle={{ padding: spacing.lg }}
        ListHeaderComponent={
          players.length > 0 ? <Text style={styles.header}>🏆 Top Players</Text> : null
        }
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.kills}>{item.kills} kills</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  empty: { color: colors.textDim, textAlign: 'center', padding: spacing.xxl, fontSize: 13 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rank: { width: 44, fontWeight: '700', color: colors.gold, fontSize: 14 },
  name: { flex: 1, color: colors.text, fontSize: 14 },
  kills: { color: colors.gold, fontWeight: '700', fontSize: 13 },
});
