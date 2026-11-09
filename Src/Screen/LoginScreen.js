import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, radius } from '../theme';

export default function LoginScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login & Register
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Sirf register ke liye

  const handleSubmit = () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert('Error', 'Kripya saari details bharein.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password kam se kam 6 characters ka hona chahiye.');
      return;
    }
    
    // Yahan hum baad mein Firebase Authentication jodenge
    // Abhi ke liye ye direct app ke andar le jayega
    onLogin({ email, name: name || email.split('@')[0] }); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.innerContainer}
      >
        <View style={styles.headerBox}>
          <View style={styles.logoBox}>
             <Ionicons name="game-controller" size={50} color={colors.primary} />
          </View>
          <Text style={styles.logoText}>EARN<Text style={{color: colors.primary}}>BATTLE</Text></Text>
          <Text style={styles.tagline}>Compete. Win. Earn.</Text>
        </View>

        <View style={styles.formBox}>
          <Text style={styles.formTitle}>{isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}</Text>
          
          {!isLogin && (
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color={colors.textDim} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={colors.textDim}
                value={name}
                onChangeText={setName}
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color={colors.textDim} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor={colors.textDim}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color={colors.textDim} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.textDim}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>{isLogin ? 'LOGIN' : 'REGISTER'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toggleBtn} onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Text style={{color: colors.primary, fontWeight: 'bold'}}>
                {isLogin ? "Register" : "Login"}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  innerContainer: { flex: 1, justifyContent: 'center', padding: spacing.xl },
  
  headerBox: { alignItems: 'center', marginBottom: 40 },
  logoBox: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.cardLight, justifyContent: 'center', alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: colors.border },
  logoText: { color: colors.text, fontSize: 28, fontWeight: '900', fontStyle: 'italic', letterSpacing: 1 },
  tagline: { color: colors.textDim, fontSize: 12, marginTop: 8, fontWeight: 'bold', letterSpacing: 1 },

  formBox: { backgroundColor: colors.card, padding: spacing.xl, borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border },
  formTitle: { color: colors.text, fontSize: 16, fontWeight: 'bold', marginBottom: 24, textAlign: 'center', letterSpacing: 1 },

  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.cardLight, borderRadius: radius.md, marginBottom: 16, paddingHorizontal: 16, borderWidth: 1, borderColor: colors.border, height: 50 },
  icon: { marginRight: 10 },
  input: { flex: 1, color: colors.text, fontSize: 14 },

  submitBtn: { backgroundColor: colors.primary, borderRadius: radius.md, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  submitText: { color: colors.text, fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },

  toggleBtn: { marginTop: 20, alignItems: 'center' },
  toggleText: { color: colors.textMuted, fontSize: 12 }
});
