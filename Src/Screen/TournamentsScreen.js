import React, { useState, useCallback } from 'react';
import {
  View, Text, FlatList, StyleSheet, RefreshControl, Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../storage';
import { colors, spacing, radius } from '../theme';
import TournamentCard from '../components/TournamentCard';
import JoinModal from '../components/JoinModal';

export default function TournamentsScreen() {
  const [tours, setTours] = useState([]);
  const [regs, setRegs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState({ visible: false, tournament: null });

  const load = useCallback(async () => {
    const [t, r] = await Promise.all([db.getTournaments(), db.getRegistrations()]);
    setTours(t);
    setRegs(r);
  }, []);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const handleJoinSubmit = async ({ name, uid, phone }) => {
    const t = modal.tournament;
    const players = await db.getPlayers();
    const registrations = await db.getRegistrations();

    let player = players.find((p) => p.uid === uid);
    if (!player) {
      player = {
        id: 'p' + Date.now(),
        name,
        uid,
        phone,
        coins: 0,
        kills: 0,
        matches: 0,
        joinedAt: new Date().toISOString(),
      };
      players.push(player);
      await db.setPlayers(players);
    }

    if (registrations.find((r) => r.tournamentId === t.id && r.playerId === player.id)) {
      Alert.alert('Already Joined', 'Aap already is tournament mein ho.');
      return;
    }

    registrations.push({
      id: 'r' + Date.now(),
      tournamentId: t.id,
      playerId: player.id,
      joinedAt: new Date().toISOString(),
    });
    await db.setRegistrations(registrations);

    setModal({ visible: false, tournament: null });
    await load();
    Alert.alert('✅ Joined!', 'Room ID/Password match se pehle milega.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.notice}>
        <Text style={styles.noticeText}>
          ⚠️ Free entry only. No cash withdrawal. Prizes = app coins (non-redeemable).
        </Text>
      </View>

      <FlatList
        data={tours}
        keyExtractor={(t) => t.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={<Text style={styles.empty}>Abhi koi tournament nahi.</Text>}
        contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}
        renderItem={({ item }) => (
          <TournamentCard
            tournament={item}
            joined={regs.filter((r) => r.tournamentId === item.id).length}
            onJoin={() => setModal({ visible: true, tournament: item })}
          />
        )}
      />

      <JoinModal
        visible={modal.visible}
        tournamentName={modal.tournament?.name || ''}
        onClose={() => setModal({ visible: false, tournament: null })}
        onSubmit={handleJoinSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  notice: {
    backgroundColor: colors.warningBg,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    borderRadius: radius.md,
  },
  noticeText: { color: colors.warning, fontSize: 12, lineHeight: 18 },
  empty: { color: colors.textDim, textAlign: 'center', padding: spacing.xxl, fontSize: 13 },
});
