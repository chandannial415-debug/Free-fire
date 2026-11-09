import React, { useState, useCallback } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet,
  Alert, RefreshControl, Modal, Linking,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../storage';
import { colors, spacing, radius } from '../theme';

const ADMIN_PIN = '1234'; // ⚠️ change this before going live!

export default function AdminScreen() {
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState('');
  const [tours, setTours] = useState([]);
  const [players, setPlayers] = useState([]);
  const [regs, setRegs] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [name, setName] = useState('');
  const [game, setGame] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [prize, setPrize] = useState('');

  const [killModal, setKillModal] = useState({ visible: false, player: null, value: '' });

  const load = useCallback(async () => {
    const [t, p, r] = await Promise.all([
      db.getTournaments(),
      db.getPlayers(),
      db.getRegistrations(),
    ]);
    setTours(t);
    setPlayers(p);
    setRegs(r);
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (authed) load();
    }, [authed, load])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  };

  const tryLogin = () => {
    if (pin === ADMIN_PIN) {
      setAuthed(true);
      setPin('');
    } else {
      Alert.alert('❌ Wrong PIN');
    }
  };

  const addTournament = async () => {
    if (!name.trim() || !game.trim() || !date.trim() || !time.trim() || !maxPlayers || !prize.trim()) {
      Alert.alert('Sab fields bharo');
      return;
    }
    const list = await db.getTournaments();
    list.push({
      id: 't' + Date.now(),
      name: name.trim(),
      game: game.trim(),
      date: date.trim(),
      time: time.trim(),
      maxPlayers: +maxPlayers,
      prize: prize.trim(),
      status: 'open',
    });
    await db.setTournaments(list);
    setName(''); setGame(''); setDate(''); setTime(''); setMaxPlayers(''); setPrize('');
    await load();
    Alert.alert('✅ Added');
  };

  const deleteTournament = (id) => {
    Alert.alert('Delete?', 'Ye tournament aur iski registrations hat jayengi.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await db.setTournaments(tours.filter((t) => t.id !== id));
          await db.setRegistrations(regs.filter((r) => r.tournamentId !== id));
          await load();
        },
      },
    ]);
  };

  const submitKills = async () => {
    const k = parseInt(killModal.value, 10);
    if (!k || k <= 0) {
      Alert.alert('Invalid', 'Positive number dalo');
      return;
    }
    const list = players.slice();
    const i = list.findIndex((p) => p.id === killModal.player.id);
    if (i === -1) return;
    list[i].kills += k;
    list[i].coins += k * 7;
    list[i].matches += 1;
    await db.setPlayers(list);
    setKillModal({ visible: false, player: null, value: '' });
    await load();
  };

  const shareWA = (t) => {
    const msg = `🎮 *${t.name}*\nGame: ${t.game}\nDate: ${t.date} ${t.time}\nPrize: ${t.prize}\nFree Entry!`;
    Linking.openURL(`https://wa.me/?text=${encodeURIComponent(msg)}`);
  };

  if (!authed) {
    return (
      <View style={styles.pinWrap}>
        <Text style={styles.heading}>🔐 Admin Access</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter PIN"
          placeholderTextColor={colors.textDim}
          value={pin}
          onChangeText={setPin}
          keyboardType="number-pad"
          secureTextEntry
          maxLength={8}
        />
        <TouchableOpacity style={styles.btn} onPress={tryLogin} activeOpacity={0.8}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.hint}>Default PIN: 1234 (change in code)</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xxl }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
      }
    >
      <Text style={styles.heading}>➕ Add Tournament</Text>
      <TextInput style={styles.input} placeholder="Name" placeholderTextColor={colors.textDim} value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Game (Free Fire MAX / BGMI)" placeholderTextColor={colors.textDim} value={game} onChangeText={setGame} />
      <TextInput style={styles.input} placeholder="Date (YYYY-MM-DD)" placeholderTextColor={colors.textDim} value={date} onChangeText={setDate} />
      <TextInput style={styles.input} placeholder="Time (e.g. 8:00 PM)" placeholderTextColor={colors.textDim} value={time} onChangeText={setTime} />
      <TextInput style={styles.input} placeholder="Max players" placeholderTextColor={colors.textDim} value={maxPlayers} onChangeText={setMaxPlayers} keyboardType="number-pad" />
      <TextInput style={styles.input} placeholder="Prize (e.g. 500 coins)" placeholderTextColor={colors.textDim} value={prize} onChangeText={setPrize} />
      <TouchableOpacity style={styles.btn} onPress={addTournament} activeOpacity={0.8}>
        <Text style={styles.btnText}>Add Tournament</Text>
      </TouchableOpacity>

      <Text style={[styles.heading, { marginTop: spacing.xxl }]}>
        📋 Tournaments ({tours.length})
      </Text>
      {tours.length === 0 && <Text style={styles.empty}>No tournaments.</Text>}
      {tours.map((t) => {
        const count = regs.filter((r) => r.tournamentId === t.id).length;
        return (
          <View key={t.id} style={styles.itemCard}>
            <View style={styles.itemHeader}>
              <Text style={styles.itemTitle} numberOfLines={2}>{t.name}</Text>
              <TouchableOpacity onPress={() => deleteTournament(t.id)}>
                <Text style={styles.delete}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.meta}>{t.game} • {count}/{t.maxPlayers}</Text>
            <Text style={styles.meta}>{t.date} {t.time} • {t.prize}</Text>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: colors.whatsapp, marginTop: spacing.sm }]}
              onPress={() => shareWA(t)}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>Share on WhatsApp</Text>
            </TouchableOpacity>
          </View>
        );
      })}

      <Text style={[styles.heading, { marginTop: spacing.xxl }]}>
        👥 Players ({players.length})
      </Text>
      {players.length === 0 && <Text style={styles.empty}>No players yet.</Text>}
      {players.map((p) => (
        <View key={p.id} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle} numberOfLines={1}>{p.name}</Text>
            <Text style={styles.meta}>UID: {p.uid}</Text>
          </View>
          <Text style={styles.meta}>📱 {p.phone}</Text>
          <Text style={styles.meta}>Kills: {p.kills} • Coins: {p.coins}</Text>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: colors.green, marginTop: spacing.sm }]}
            onPress={() => setKillModal({ visible: true, player: p, value: '' })}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>+ Add Kills</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Modal
        visible={killModal.visible}
        transparent
        animationType="fade"
        onRequestClose={() => setKillModal({ visible: false, player: null, value: '' })}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>
              Add Kills — {killModal.player?.name}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Number of kills"
              placeholderTextColor={colors.textDim}
              value={killModal.value}
              onChangeText={(v) => setKillModal({ ...killModal, value: v.replace(/[^0-9]/g, '') })}
              keyboardType="number-pad"
              autoFocus
            />
            <TouchableOpacity style={styles.btn} onPress={submitKills} activeOpacity={0.8}>
              <Text style={styles.btnText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: '#333' }]}
              onPress={() => setKillModal({ visible: false, player: null, value: '' })}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  pinWrap: { flex: 1, backgroundColor: colors.bg, padding: spacing.lg, justifyContent: 'center' },
  heading: { fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.text,
    marginBottom: spacing.sm,
    fontSize: 14,
    minHeight: 44,
  },
  btn: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  hint: { color: colors.textDim, fontSize: 11, textAlign: 'center', marginTop: spacing.md },
  empty: { color: colors.textDim, fontSize: 13, padding: spacing.md, textAlign: 'center' },
  itemCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: 8,
  },
  itemTitle: { fontSize: 14, fontWeight: '700', color: colors.text, flex: 1 },
  delete: { color: colors.danger, fontWeight: '700', fontSize: 16, paddingHorizontal: spacing.sm },
  meta: { fontSize: 12, color: colors.textMuted, marginBottom: 2 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  modalSheet: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.xl,
  },
  modalTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: spacing.md },
});
