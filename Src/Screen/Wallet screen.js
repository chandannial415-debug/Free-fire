import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WalletScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>WALLET MANAGEMENT</Text>
        </View>

        {/* Main Balance Card */}
        <View style={styles.mainCard}>
          <Text style={styles.cardLabel}>TOTAL USABLE BALANCE</Text>
          <Text style={styles.totalAmount}>₹0</Text>

          {/* Split Balances */}
          <View style={styles.splitRow}>
            <View style={styles.splitBox}>
              <Text style={styles.splitLabel}>DEPOSIT</Text>
              <Text style={styles.splitValueBlue}>₹0</Text>
            </View>
            <View style={styles.splitBox}>
              <Text style={styles.splitLabel}>WINNINGS</Text>
              <Text style={styles.splitValueGreen}>₹0</Text>
            </View>
          </View>
        </View>

        {/* Bonus Balance Card */}
        <View style={styles.bonusCard}>
          <View>
            <Text style={styles.bonusTitle}>BONUS BALANCE</Text>
            <Text style={styles.bonusSub}>Cannot be used for match joining</Text>
          </View>
          <Text style={styles.bonusAmount}>₹0</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.addCashBtn}>
            <Ionicons name="add" size={20} color="#000" />
            <Text style={styles.addCashText}>ADD CASH</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.withdrawBtn}>
            <Text style={styles.withdrawText}>WITHDRAW MONEY</Text>
          </TouchableOpacity>
        </View>

        {/* Recent History Section */}
        <View style={styles.historyHeader}>
          <Text style={styles.historyTitle}>RECENT HISTORY</Text>
          <TouchableOpacity>
            <Text style={styles.statementText}>STATEMENT</Text>
          </TouchableOpacity>
        </View>

        {/* Empty History Placeholder */}
        <View style={styles.emptyHistory}>
          <Ionicons name="receipt-outline" size={40} color="#333" />
          <Text style={styles.emptyText}>No transactions yet</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  header: { padding: 16, alignItems: 'center', marginTop: 10 },
  pageTitle: { color: '#aaa', fontSize: 12, fontWeight: 'bold', letterSpacing: 2 },
  
  mainCard: { backgroundColor: '#121212', margin: 16, borderRadius: 24, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#222' },
  cardLabel: { color: '#666', fontSize: 10, fontWeight: 'bold', letterSpacing: 1, marginBottom: 10 },
  totalAmount: { color: '#fff', fontSize: 48, fontWeight: '900', fontStyle: 'italic', marginBottom: 24 },
  
  splitRow: { flexDirection: 'row', gap: 16, width: '100%' },
  splitBox: { flex: 1, backgroundColor: '#1a1a1a', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#2a2a2a' },
  splitLabel: { color: '#666', fontSize: 10, fontWeight: 'bold', marginBottom: 8 },
  splitValueBlue: { color: '#3b82f6', fontSize: 18, fontWeight: 'bold' },
  splitValueGreen: { color: '#22c55e', fontSize: 18, fontWeight: 'bold' },

  bonusCard: { backgroundColor: '#1a1a1a', marginHorizontal: 16, borderRadius: 16, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#2a2a2a', marginBottom: 24 },
  bonusTitle: { color: '#9333ea', fontSize: 12, fontWeight: 'bold' },
  bonusSub: { color: '#666', fontSize: 10, marginTop: 4 },
  bonusAmount: { color: '#9333ea', fontSize: 18, fontWeight: 'bold' },

  actionsContainer: { paddingHorizontal: 16, gap: 12 },
  addCashBtn: { backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 16, gap: 8 },
  addCashText: { color: '#000', fontSize: 14, fontWeight: '900' },
  withdrawBtn: { backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#333' },
  withdrawText: { color: '#fff', fontSize: 14, fontWeight: '900' },

  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, marginTop: 32, marginBottom: 16 },
  historyTitle: { color: '#aaa', fontSize: 12, fontWeight: 'bold', letterSpacing: 1, fontStyle: 'italic' },
  statementText: { color: '#9333ea', fontSize: 12, fontWeight: 'bold' },

  emptyHistory: { alignItems: 'center', padding: 40 },
  emptyText: { color: '#666', fontSize: 12, marginTop: 10 }
});
