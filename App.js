import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import ArenaScreen from './src/screens/ArenaScreen';
import LeaderboardScreen from './src/screens/LeaderboardScreen';
import WalletScreen from './src/screens/WalletScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

// Dark Premium Theme (Screenshots jaisa)
const navTheme = {
  dark: true,
  colors: {
    primary: '#9333ea', // Purple
    background: '#0a0a0a', // Deep Black
    card: '#121212', // Dark Gray
    text: '#ffffff',
    border: '#1f1f1f',
    notification: '#9333ea',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Header chhupaya gaya hai premium look ke liye
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'HOME') iconName = 'home';
            else if (route.name === 'ARENA') iconName = 'trophy';
            else if (route.name === 'LEADERBOARD') iconName = 'podium';
            else if (route.name === 'WALLET') iconName = 'wallet';
            else if (route.name === 'PROFILE') iconName = 'person';
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
      </Tab.Navigator>
    </NavigationContainer>
  );
}
