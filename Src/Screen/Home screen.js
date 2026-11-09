import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Top Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
             <Text style={styles.logoText}>EARN<Text style={{color: '#9333ea'}}>BATTLE</Text>2.0</Text>
             <View style={styles.serverStatus}>
                <View style={styles.greenDot} />
                <Text style={styles.serverText}>SERVER ONLINE</Text>
             </View>
          </View>
          <View style={styles.walletIcon}>
             <Text style={styles.walletAmount}>₹0</Text>
             <Ionicons name="wallet" size={20} color="#9333ea" />
          </View>
        </View>

        {/* Announcement Bar */}
        <View style={styles.announcementBar}>
          <Ionicons name="megaphone" size={16} color="#9333ea" />
          <Text style={styles.announcementText}>WITHDRAWAL TIME 1 MIN - 30 MIN</Text>
          <Ionicons name="chevron-forward" size={16} color="#666" />
        </View>

        {/* Main Banner (Yahan aap apni image ka link daal sakte hain baad mein) */}
        <View style={styles.bannerContainer}>
          <View style={styles.placeholderBanner}>
             <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>FREE FIRE BANNER</Text>
             <Text style={{color: '#aaa', fontSize: 12}}>(Yahan badi photo aayegi)</Text>
          </View>
        </View>

        {/* Select Arena Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SELECT ARENA</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ARENA')}>
             <Text style={styles.viewAllText}>VIEW ALL {'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Arena Cards */}
        <View style={styles.arenaRow}>
          {/* Free Fire Card */}
          <TouchableOpacity style={styles.arenaCard} onPress={() => navigation.navigate('ARENA')}>
            <View style={styles.arenaImagePlaceholder}>
                <Text style={{color:'#fff'}}>FF Image</Text>
            </View>
            <View style={styles.arenaOverlay}>
                <Text style={styles.arenaTitle}>FREE FIRE</Text>
                <View style={styles.playBtn}>
                    <Text style={styles.playBtnText}>PLAY</Text>
                    <Ionicons name="play-circle" size={16} color="#fff" />
                </View>
            </View>
          </TouchableOpacity>

          {/* BGMI Card */}
          <TouchableOpacity style={styles.arenaCard} onPress={() => navigation.navigate('ARENA')}>
            <View style={styles.arenaImagePlaceholder}>
                <Text style={{color:'#fff'}}>BGMI Image</Text>
            </View>
            <View style={styles.arenaOverlay}>
                <Text style={styles.arenaTitle}>BGMI</Text>
                <View style={styles.playBtn}>
                    <Text style={styles.playBtnText}>PLAY</Text>
                    <Ionicons name="play-circle" size={16} color="#fff" />
                </View>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#121212' },
  logoText: { color: '#fff', fontSize: 20, fontWeight: '900', fontStyle: 'italic' },
  serverStatus: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  greenDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#22c55e', marginRight: 4 },
  serverText: { color: '#666', fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  walletIcon: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, gap: 8 },
  walletAmount: { color: '#fff', fontWeight: 'bold' },
  
  announcementBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1a', margin: 16, padding: 12, borderRadius: 10, gap: 10 },
  announcementText: { color: '#fff', flex: 1, fontSize: 12, fontWeight: 'bold' },
  
  bannerContainer: { paddingHorizontal: 16, marginBottom: 20 },
  placeholderBanner: { width: '100%', height: 180, backgroundColor: '#2a2a2a', borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: '900', fontStyle: 'italic', letterSpacing: 1 },
  viewAllText: { color: '#9333ea', fontSize: 12, fontWeight: 'bold' },
  
  arenaRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16 },
  arenaCard: { width: '48%', height: 120, borderRadius: 12, overflow: 'hidden', backgroundColor: '#1a1a1a', borderWidth: 1, borderColor: '#333' },
  arenaImagePlaceholder: { width: '100%', height: '100%', backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' },
  arenaOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10, backgroundColor: 'rgba(0,0,0,0.6)' },
  arenaTitle: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginBottom: 6 },
  playBtn: { flexDirection: 'row', backgroundColor: 'rgba(147, 51, 234, 0.8)', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, alignItems: 'center', justifyContent: 'center', gap: 4 },
  playBtnText: { color: '#fff', fontSize: 10, fontWeight: 'bold' }
});
