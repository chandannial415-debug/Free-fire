import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={40} color="#666" />
          </View>
          <Text style={styles.userName}>Player Name</Text>
          <Text style={styles.userEmail}>player@example.com</Text>
          
          <View style={styles.statsRow}>
             <View style={styles.statBox}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>MATCHES</Text>
             </View>
             <View style={styles.statBox}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>WINS</Text>
             </View>
             <View style={styles.statBox}>
                <Text style={styles.statValue}>0</Text>
                <Text style={styles.statLabel}>KILLS</Text>
             </View>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>ACCOUNT SETTINGS</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
               <Ionicons name="create-outline" size={20} color="#9333ea" />
            </View>
            <Text style={styles.menuText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
               <Ionicons name="game-controller-outline" size={20} color="#9333ea" />
            </View>
            <Text style={styles.menuText}>Link Game ID</Text>
            <Ionicons name="chevron-forward" size={20} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
               <Ionicons name="shield-checkmark-outline" size={20} color="#9333ea" />
            </View>
            <Text style={styles.menuText}>KYC Verification</Text>
            <Ionicons name="chevron-forward" size={20} color="#333" />
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>SUPPORT & LEGAL</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
               <Ionicons name="help-circle-outline" size={20} color="#9333ea" />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconBox}>
               <Ionicons name="document-text-outline" size={20} color="#9333ea" />
            </View>
            <Text style={styles.menuText}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={20} color="#333" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { marginTop: 20, borderBottomWidth: 0 }]}>
            <View style={[styles.menuIconBox, { backgroundColor: '#2a0a0a' }]}>
               <Ionicons name="log-out-outline" size={20} color="#ef4444" />
            </View>
            <Text style={[styles.menuText, { color: '#ef4444' }]}>Log Out</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  
  header: { alignItems: 'center', padding: 24, backgroundColor: '#121212', borderBottomWidth: 1, borderBottomColor: '#222' },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 2, borderColor: '#9333ea' },
  userName: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  userEmail: { color: '#666', fontSize: 12, marginTop: 4, marginBottom: 20 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', backgroundColor: '#1a1a1a', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#2a2a2a' },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  statLabel: { color: '#666', fontSize: 10, fontWeight: 'bold', marginTop: 4, letterSpacing: 1 },

  menuContainer: { padding: 16 },
  sectionTitle: { color: '#666', fontSize: 11, fontWeight: 'bold', letterSpacing: 1, marginBottom: 12, marginLeft: 4 },
  
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#121212', padding: 16, borderRadius: 16, marginBottom: 8, borderWidth: 1, borderColor: '#222' },
  menuIconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  menuText: { flex: 1, color: '#fff', fontSize: 14, fontWeight: '600' },
});
