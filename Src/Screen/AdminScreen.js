import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ⚠️ Yahan apni Email ID aur Password set karo
const OWNER_EMAIL = 'chandannial938@gmail.com';
const ADMIN_PIN = '1234'; 

export default function AdminScreen() {
  const [step, setStep] = useState(1); // 1 = Email Check, 2 = PIN, 3 = Admin Panel
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');

  const handleEmailCheck = () => {
    if (email.toLowerCase() === OWNER_EMAIL.toLowerCase()) {
      setStep(2); // Email sahi hai, ab PIN maango
    } else {
      Alert.alert('Access Denied', 'Ye email admin ke liye registered nahi hai.');
    }
  };

  const handlePinCheck = () => {
    if (pin === ADMIN_PIN) {
      setStep(3); // PIN sahi hai, Admin panel kholo
    } else {
      Alert.alert('Error', 'Galat PIN! Dobara koshish karein.');
    }
  };

  // --- SCREEN 1: Email Check ---
  if (step === 1) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginBox}>
          <Ionicons name="mail" size={60} color="#9333ea" style={{ marginBottom: 20 }} />
          <Text style={styles.title}>ADMIN LOGIN</Text>
          <Text style={styles.subtitle}>Enter Owner Email to continue</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter your Email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.btn} onPress={handleEmailCheck}>
            <Text style={styles.btnText}>VERIFY EMAIL</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // --- SCREEN 2: PIN Check ---
  if (step === 2) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginBox}>
          <Ionicons name="lock-closed" size={60} color="#9333ea" style={{ marginBottom: 20 }} />
          <Text style={styles.title}>SECURITY PIN</Text>
          <Text style={styles.subtitle}>Enter 4-digit Admin PIN</Text>
          
          <TextInput
            style={styles.input}
            placeholder="****"
            placeholderTextColor="#666"
            value={pin}
            onChangeText={setPin}
            keyboardType="number-pad"
            secureTextEntry
            maxLength={4}
          />
          <TouchableOpacity style={styles.btn} onPress={handlePinCheck}>
            <Text style={styles.btnText}>UNLOCK PANEL</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // --- SCREEN 3: Main Admin Panel ---
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>ADMIN DASHBOARD</Text>
          <TouchableOpacity onPress={() => setStep(1)}>
            <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Total Matches</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>150</Text>
            <Text style={styles.statLabel}>Registered Users</Text>
          </View>
        </View>

        <View style={styles.actionBox}>
          <Text style={styles.sectionTitle}>QUICK ACTIONS</Text>
          
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="add-circle" size={20} color="#9333ea" />
            <Text style={styles.actionText}>Create New Tournament</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="people" size={20} color="#9333ea" />
            <Text style={styles.actionText}>Manage Users</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="cash" size={20} color="#9333ea" />
            <Text style={styles.actionText}>Withdrawal Requests</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  
  // Login Screens
  loginBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { color: '#fff', fontSize: 22, fontWeight: '900', fontStyle: 'italic', letterSpacing: 1 },
  subtitle: { color: '#666', fontSize: 12, marginTop: 8, marginBottom: 32 },
  input: { width: '100%', backgroundColor: '#121212', borderWidth: 1, borderColor: '#333', borderRadius: 12, padding: 16, color: '#fff', fontSize: 16, marginBottom: 16 },
  btn: { width: '100%', backgroundColor: '#9333ea', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },

  // Admin Panel
  panelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#222' },
  panelTitle: { color: '#fff', fontSize: 20, fontWeight: '900', fontStyle: 'italic' },
  
  statsRow: { flexDirection: 'row', padding: 16, gap: 16 },
  statCard: { flex: 1, backgroundColor: '#121212', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#222', alignItems: 'center' },
  statValue: { color: '#9333ea', fontSize: 24, fontWeight: 'bold' },
  statLabel: { color: '#666', fontSize: 10, fontWeight: 'bold', marginTop: 4 },

  actionBox: { padding: 16 },
  sectionTitle: { color: '#666', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 16 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#121212', padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#222', gap: 12 },
  actionText: { color: '#fff', fontSize: 14, fontWeight: '600' }
});
