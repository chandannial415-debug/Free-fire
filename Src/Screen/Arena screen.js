import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dummy Data (Baad mein isko Firebase se connect karenge)
const TOURNAMENTS = [
  { id: '1', game: 'FREE FIRE', mode: 'BR SQUAD', title: 'FREE FIRE DOUBLE MONEY TOP 1-5', time: '05:00 PM | 02 SEP', prize: '₹2600', entry: '₹70', joined: 0, total: 48, image: 'https://i.ibb.co/6P2ZqK5/freefire-banner.jpg' },
  { id: '2', game: 'FREE FIRE', mode: 'BR SOLO', title: 'FREE FIRE FREE BATTLE ROYALE', time: '12:00 AM | 02 SEP', prize: '₹550', entry: '₹15', joined: 0, total: 48, image: 'https://i.ibb.co/6P2ZqK5/freefire-banner.jpg' },
  { id: '3', game: 'BGMI', mode: 'SQUAD', title: 'BGMI PREMIUM LEAGUE', time: '08:00 PM | 03 SEP', prize: '₹5000', entry: '₹100', joined: 12, total: 100, image: 'https://i.ibb.co/3kK0p1b/bgmi-banner.jpg' },
];

export default function ArenaScreen() {
  const [activeFilter, setActiveFilter] = useState('ALL GAMES');

  const filters = ['ALL GAMES', 'BGMI', 'FREE FIRE', 'COD MOBILE'];

  // Filter logic
  const filteredTours = TOURNAMENTS.filter(t => 
    activeFilter === 'ALL GAMES' ? true : t.game === activeFilter
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>MATCH <Text style={{color: '#9333ea'}}>ARENA</Text></Text>
            <Text style={styles.subtitle}>COMPETE WITH THE BEST</Text>
          </View>
          <View style={styles.trophyBox}>
            <Ionicons name="trophy" size={16} color="#9333ea" />
            <Text style={styles.trophyText}>50</Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={{ paddingHorizontal: 16 }}>
          {filters.map((f) => (
            <TouchableOpacity 
              key={f} 
              style={[styles.filterBtn, activeFilter === f && styles.filterBtnActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Status Tabs */}
        <View style={styles.statusTabs}>
          <TouchableOpacity style={[styles.statusTab, styles.statusTabActive]}>
            <Text style={styles.statusTabTextActive}>UPCOMING <Text style={styles.countBadgeActive}>26</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statusTab}>
            <Text style={styles.statusTabText}>ONGOING <Text style={{color: '#f59e0b'}}>0</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statusTab}>
            <Text style={styles.statusTabText}>COMPLETED <Text style={{color: '#22c55e'}}>24</Text></Text>
          </TouchableOpacity>
        </View>

        {/* Tournament List */}
        <View style={{ padding: 16 }}>
          {filteredTours.map((item) => (
            <View key={item.id} style={styles.card}>
              
              {/* Card Image Placeholder (Aap yahan asli image daal sakte hain baad me) */}
              <View style={styles.cardImage}>
                <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold', fontStyle: 'italic'}}>{item.game}</Text>
              </View>

              {/* Card Details */}
              <View style={styles.cardContent}>
                <View style={styles.cardHeaderRow}>
                  <View style={styles.modeBadge}>
                    <Text style={styles.modeText}>{item.mode}</Text>
                  </View>
                  <View style={styles.timeBadge}>
                    <Ionicons name="time-outline" size={14} color="#fff" />
                    <Text style={styles.timeText}>{item.time}</Text>
                  </View>
                </View>

                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubTitle}>FREE FIRE BATTLE ROYALE TOURNAMENT</Text>

                {/* Stats Row (Prize, Kill, Entry) */}
                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>PRIZE</Text>
                    <Text style={styles.statValueGreen}>{item.prize}</Text>
                  </View>
                  <View style={[styles.statItem, styles.statBorder]}>
                    <Text style={styles.statLabel}>KILL</Text>
                    <Text style={styles.statValueWhite}>-</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statLabel}>ENTRY</Text>
                    <Text style={styles.statValuePurple}>{item.entry}</Text>
                  </View>
                </View>

                {/* Join Row */}
                <View style={styles.joinRow}>
                  <Text style={styles.joinedText}>{item.joined}/{item.total}</Text>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    <TouchableOpacity style={styles.rulesBtn}>
                      <Text style={styles.rulesText}>VIEW RULES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.joinBtn}>
                      <Text style={styles.joinText}>JOIN</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: '900', fontStyle: 'italic', color: '#fff' },
  subtitle: { fontSize: 10, color: '#666', letterSpacing: 1, fontWeight: 'bold', marginTop: 4 },
  trophyBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 6 },
  trophyText: { color: '#fff', fontWeight: 'bold' },
  
  filterScroll: { paddingVertical: 10 },
  filterBtn: { backgroundColor: '#1a1a1a', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#333' },
  filterBtnActive: { backgroundColor: '#9333ea', borderColor: '#9333ea' },
  filterText: { color: '#aaa', fontSize: 12, fontWeight: 'bold' },
  filterTextActive: { color: '#fff' },

  statusTabs: { flexDirection: 'row', marginHorizontal: 16, marginTop: 10, marginBottom: 10, backgroundColor: '#121212', borderRadius: 12, padding: 4, justifyContent: 'space-between' },
  statusTab: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  statusTabActive: { backgroundColor: '#9333ea', borderRadius: 10 },
  statusTabText: { color: '#888', fontSize: 12, fontWeight: 'bold' },
  statusTabTextActive: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  countBadgeActive: { backgroundColor: '#00000050', paddingHorizontal: 6, borderRadius: 10 },

  card: { backgroundColor: '#121212', borderRadius: 16, marginBottom: 20, borderWidth: 1, borderColor: '#222', overflow: 'hidden' },
  cardImage: { width: '100%', height: 140, backgroundColor: '#2a2a2a', justifyContent: 'center', alignItems: 'center' },
  cardContent: { padding: 16 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  modeBadge: { backgroundColor: '#1a1a1a', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: '#333' },
  modeText: { color: '#9333ea', fontSize: 10, fontWeight: 'bold' },
  timeBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  cardSubTitle: { color: '#9333ea', fontSize: 10, fontWeight: 'bold', marginBottom: 16 },

  statsRow: { flexDirection: 'row', borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#222', paddingVertical: 12, marginBottom: 16 },
  statItem: { flex: 1, alignItems: 'center' },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#222' },
  statLabel: { color: '#666', fontSize: 10, fontWeight: 'bold', marginBottom: 4 },
  statValueGreen: { color: '#22c55e', fontSize: 14, fontWeight: 'bold' },
  statValueWhite: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  statValuePurple: { color: '#9333ea', fontSize: 14, fontWeight: 'bold' },

  joinRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  joinedText: { color: '#9333ea', fontSize: 12, fontWeight: 'bold' },
  rulesBtn: { backgroundColor: '#1a1a1a', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, borderWidth: 1, borderColor: '#333' },
  rulesText: { color: '#aaa', fontSize: 12, fontWeight: 'bold' },
  joinBtn: { backgroundColor: '#9333ea', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
  joinText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});
