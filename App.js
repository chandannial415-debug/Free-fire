import React, { useState } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ArenaScreen from './src/screens/ArenaScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import WalletScreen from './src/screens/WalletScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import AdminScreen from './src/screens/AdminScreen';

const Tab = createBottomTabNavigator();

const navTheme = {
  dark: true,
  colors: {
    primary: '#9333ea',
    background: '#0a0a0a',
    card: '#121212',
    text: '#ffffff',
    border: '#1f1f1f',
    notification: '#9333ea',
  },
};

export default function App() {
  const [user, setUser] = useState(null); // User state (null = not logged in)

  // Agar user login nahi hai, to sirf Login Screen dikhao
  if (!user) {
    return (
      <NavigationContainer theme={navTheme}>
        <StatusBar style="light" />
        <LoginScreen onLogin={(userData) => setUser(userData)} />
      </NavigationContainer>
    );
  }

  // Agar user login hai, to Main App dikhao
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'HOME') iconName = 'home';
            else if (route.name === 'ARENA') iconName = 'trophy';
            else if (route.name === 'LEADERBOARD') iconName = 'podium';
            else if (route.name === 'WALLET') iconName = 'wallet';
            else if (route.name === 'PROFILE') iconName = 'person';
            else if (route.name === 'ADMIN') iconName = 'settings';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#9333ea',
          tabBarInactiveTintColor: '#666666',
          tabBarStyle: {
            backgroundColor: '#121212',
            borderTopWidth: 1,
            borderTopColor: '#1f1f1f',
            height: 65,
            paddingBottom: 10,
            paddingTop: 5,
          },
          tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
        })}
      >
        <Tab.Screen name="HOME" component={HomeScreen} />
        <Tab.Screen name="ARENA" component={ArenaScreen} />
        <Tab.Screen name="LEADERBOARD" component={LeaderboardScreen} />
        <Tab.Screen name="WALLET" component={WalletScreen} />
        <Tab.Screen name="PROFILE" component={ProfileScreen} />
        
        {/* Admin Tab sirf test ke liye yahan hai, baad mein ise hatayenge ya chhupayenge */}
        <Tab.Screen name="ADMIN" component={AdminScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
