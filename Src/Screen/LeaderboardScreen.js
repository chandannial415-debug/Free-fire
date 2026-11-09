import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dummy Data Leaderboard ke liye
const LEADERBOARD_DATA = [
  { id: 1, name: 'Rahul_Gamer', kills: 154, earnings: '₹2,500', rank: 1 },
  { id: 2, name: 'AmanPro', kills: 142, earnings: '₹1,800', rank: 2 },
  { id: 3, name: 'Vikram_FF', kills: 120, earnings: '₹1,200', rank: 3 },
  { id: 4, name: 'SureshOP', kills: 98, earnings: '₹800', rank: 4 },
  { id: 5, name: 'Rohan_X', kills: 85, earnings: '₹500', rank: 5 },
  { id: 6, name: 'Karan_99', kills: 76, earnings: '₹300', rank: 6 },
];

export default function LeaderboardScreen() {
  const [activeTab, setActiveTab] = useState('GLOBAL'); // GLOBAL or WEEKLY

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>LEADERBOARD</Text>
          <Text style={styles.headerSub}>Top players competing for glory</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabBtn, activeTab === 'GLOBAL' && styles.tabBtnActive]}
            onPress={() => setActiveTab('GLOBAL')}
          >
            <Text style={[styles.tabText, activeTab === 'GLOBAL' && styles.tabTextActive]}>GLOBAL</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabBtn, activeTab === 'WEEKLY' && styles.tabBtnActive]}
            onPress={() => setActiveTab('WEEKLY')}
          >
            <Text style={[styles.tabText, activeTab === 'WEEKLY' && styles.tabTextActive]}>WEEKLY</Text>
          </TouchableOpacity>
        </View>

        {/* Top 3 Podium Section */}
        <View style={styles.podiumContainer}>
          {/* Rank 2 */}
          <View style={styles.podiumItem}>
            <View style={[styles.avatar, { borderColor: '#C0C0C0' }]}>
              <Text style={styles.avatarText}>{LEADERBOARD_DATA[1].name.charAt(0)}</Text>
            </View>
            <Text style={styles.podiumName}>{LEADERBOARD_DATA[1].name}</Text>
            <Text style={styles.podiumKills}>{LEADERBOARD_DATA[1].kills} Kills</Text>
            <View style={[styles.podiumBase, { height: 80, backgroundColor: '#C0C0C0' }]}>
              <Text style={styles.podiumRankText}>2</Text>
            </View>
          </View>

          {/* Rank 1 */}
          <View style={styles.podiumItem}>
            <Ionicons name="trophy" size={24} color="#FBBF24" style={{marginBottom: 4}} />
            <View style={[styles.avatar, { borderColor: '#FBBF24', width: 70, height: 70, borderRadius: 35 }]}>
              <Text style={[styles.avatarText, { fontSize: 24 }]}>{LEADERBOARD_DATA[0].name.charAt(0)}</Text>
            </View>
            <Text style={[styles.podiumName, { color: '#FBBF24' }]}>{LEADERBOARD_DATA[0].name}</Text>
            <Text style={styles.podiumKills}>{LEADERBOARD_DATA[0].kills} Kills</Text>
            <View style={[styles.podiumBase, { height: 110, backgroundColor: '#FBBF24' }]}>
              <Text style={styles.podiumRankText}>1</Text>
            </View>
          </View>

          {/* Rank 3 */}
          <View style={styles.podiumItem}>
            <View style={[styles.avatar, { borderColor: '#CD7F32' }]}>
              <Text style={styles.avatarText}>{LEADERBOARD_DATA[2].name.charAt(0)}</Text>
            </View>
            <Text style={styles.podiumName}>{LEADERBOARD_DATA[2].name}</Text>
            <Text style={styles.podiumKills}>{LEADERBOARD_DATA[2].kills} Kills</Text>
            <View style={[styles.podiumBase, { height: 60, backgroundColor: '#CD7F32' }]}>
              <Text style={styles.podiumRankText}>3</Text>
            </View>
          </View>
        </View>

        {/* Rest of the List */}
        <View style={styles.listContainer}>
          <Text style={styles.listHeaderTitle}>TOP PLAYERS</Text>
          
          {LEADERBOARD_DATA.slice(3).map((player, index) => (
            <View key={player.id} style={styles.listItem}>
              <Text style={styles.listRank}>#{player.rank}</Text>
              
              <View style={styles.listAvatar}>
                <Text style={styles.listAvatarText}>{player.name.charAt(0)}</Text>
              </View>
              
              <View style={styles.listInfo}>
                <Text style={styles.listName}>{player.name}</Text>
                <Text style={styles.listKills}>{player.kills} Kills</Text>
              </View>
              
              <Text style={styles.listEarnings}>{player.earnings}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { padding: 16, alignItems: 'center', marginTop: 10 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: '900', fontStyle: 'italic', letterSpacing: 1 },
  headerSub: { color: '#666', fontSize: 12, marginTop: 4 },
  
  tabContainer: { flexDirection: 'row', marginHorizontal: 16, backgroundColor: '#121212', borderRadius: 12, padding: 4, marginBottom: 24 },
  tabBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10 },
  tabBtnActive: { backgroundColor: '#9333ea' },
  tabText: { color: '#666', fontSize: 12, fontWeight: 'bold' },
  tabTextActive: { color: '#fff' },

  podiumContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginBottom: 32, paddingHorizontal: 16 },
  podiumItem: { alignItems: 'center', marginHorizontal: 8, flex: 1 },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', borderWidth: 2, marginBottom: 8 },
  avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  podiumName: { color: '#fff', fontSize: 12, fontWeight: 'bold', textAlign: 'center' },
  podiumKills: { color: '#666', fontSize: 10, marginTop: 2, marginBottom: 8 },
  podiumBase: { width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, justifyContent: 'center', alignItems: 'center' },
  podiumRankText: { color: '#000', fontSize: 24, fontWeight: '900' },

  listContainer: { paddingHorizontal: 16 },
  listHeaderTitle: { color: '#666', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 12 },
  listItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#121212', padding: 12, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#222' },
  listRank: { color: '#fff', fontSize: 14, fontWeight: 'bold', width: 30 },
  listAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  listAvatarText: { color: '#9333ea', fontSize: 16, fontWeight: 'bold' },
  listInfo: { flex: 1 },
  listName: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  listKills: { color: '#666', fontSize: 12 },
  listEarnings: { color: '#22c55e', fontSize: 14, fontWeight: 'bold' },
});
