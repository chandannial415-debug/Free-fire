import React, { useState, useEffect } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { colors, spacing, radius } from '../theme';

export default function JoinModal({ visible, tournamentName, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [uid, setUid] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!visible) {
      setName('');
      setUid('');
      setPhone('');
      setError('');
    }
  }, [visible]);

  const submit = () => {
    setError('');
    if (!name.trim() || !uid.trim() || phone.length !== 10) {
      setError('Saari fields sahi bharo (phone 10 digit)');
      return;
    }
    onSubmit({ name: name.trim(), uid: uid.trim(), phone });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.backdrop}
      >
        <View style={styles.sheet}>
          <Text style={styles.title}>Join Tournament</Text>
          <Text style={styles.sub}>{tournamentName}</Text>

          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor={colors.textDim}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Game UID (Free Fire MAX / BGMI)"
            placeholderTextColor={colors.textDim}
            value={uid}
            onChangeText={setUid}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone (10 digit)"
            placeholderTextColor={colors.textDim}
            value={phone}
            onChangeText={(v) => setPhone(v.replace(/[^0-9]/g, '').slice(0, 10))}
            keyboardType="number-pad"
            maxLength={10}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity style={styles.btn} onPress={submit} activeOpacity={0.8}>
            <Text style={styles.btnText}>Free Join</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnCancel}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  sheet: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.xl,
  },
  title: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: spacing.xs },
  sub: { fontSize: 12, color: colors.textMuted, marginBottom: spacing.lg },
  input: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.text,
    marginBottom: spacing.md,
    fontSize: 14,
    minHeight: 44,
  },
  error: { color: colors.danger, fontSize: 12, marginBottom: spacing.sm },
  btn: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },
  btnCancel: {
    backgroundColor: '#333',
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginTop: spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },
  btnText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});
