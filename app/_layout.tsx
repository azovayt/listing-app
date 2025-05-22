import '../global.css';
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { SafeAreaView  } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const RootLayout = () => {
    
  useEffect(() => {
    const timer = setTimeout(() => {
      const checkAuth = async () => {
        try {
          const token = await AsyncStorage.getItem('jwt');
          if (token) {
            router.replace('/(tabs)/showcase');
          } else {
            router.replace('/login');
          }
        } catch (error) {
          console.error('RootLayout: Oturum kontrol hatası:', error);
          router.replace('/login');
        }
      };
      checkAuth();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style='auto' />
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}

export default RootLayout;