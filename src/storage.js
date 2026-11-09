import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  TOURNAMENTS: '@es_tournaments',
  PLAYERS: '@es_players',
  REGISTRATIONS: '@es_registrations',
  SEEDED: '@es_seeded',
};

async function get(key, def) {
  try {
    const v = await AsyncStorage.getItem(key);
    return v ? JSON.parse(v) : def;
  } catch {
    return def;
  }
}

async function set(key, val) {
  await AsyncStorage.setItem(key, JSON.stringify(val));
}

export const db = {
  getTournaments: () => get(KEYS.TOURNAMENTS, []),
  setTournaments: (v) => set(KEYS.TOURNAMENTS, v),

  getPlayers: () => get(KEYS.PLAYERS, []),
  setPlayers: (v) => set(KEYS.PLAYERS, v),

  getRegistrations: () => get(KEYS.REGISTRATIONS, []),
  setRegistrations: (v) => set(KEYS.REGISTRATIONS, v),

  isSeeded: () => AsyncStorage.getItem(KEYS.SEEDED),
  markSeeded: () => AsyncStorage.setItem(KEYS.SEEDED, '1'),

  resetAll: async () => {
    await AsyncStorage.multiRemove(Object.values(KEYS));
  },
};

export async function seedIfNeeded() {
  const seeded = await db.isSeeded();
  if (seeded) return;
  await db.setTournaments([
    {
      id: 't1',
      name: 'Solo Showdown #1',
      game: 'Free Fire MAX',
      date: '2026-11-15',
      time: '8:00 PM',
      maxPlayers: 48,
      prize: '500 coins',
      status: 'open',
    },
    {
      id: 't2',
      name: 'Squad Clash #3',
      game: 'BGMI',
      date: '2026-11-16',
      time: '9:00 PM',
      maxPlayers: 100,
      prize: '1000 coins',
      status: 'open',
    },
  ]);
  await db.markSeeded();
}
