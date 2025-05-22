import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../src/hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, data, loading, error } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      const checkAuth = async () => {
        try {
          const token = await AsyncStorage.getItem('jwt');
          if (token) {
            router.replace('/(tabs)/showcase');
          }
        } catch (error) {
          console.error('Login: Session control error:', error);
        }
      };
      checkAuth();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      router.replace('/(tabs)/showcase');
    }
  }, [data]);

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }
    await login({ identifier: email, password });
  };

  return (
    <View className="flex-1 justify-center bg-white px-10 py-10">
      <View className="mb-4 items-center">
        <Image 
          source={require('../assets/S-Logo1.png')} 
          className="w-24 h-24 mb-4"
          resizeMode="contain"
        />
        <Text className="text-2xl font-bold text-center text-gray-800">Welcome</Text>
        <Text className="text-center text-gray-600 mt-2">Please log in to your account</Text>
      </View>
      <View className="space-y-4">
        <View className="mb-4">
          <Text className="font-medium text-gray-700 mb-2">Username</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your username"
            autoCapitalize="none"
            keyboardType="email-address"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-4 py-3 w-full"
          />
        </View>
        <View className="mb-6">
          <Text className="font-medium text-gray-700 mb-2">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-4 py-3 w-full"
          />
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          className={`py-3 px-6 rounded-lg ${loading ? 'bg-blue-400' : 'bg-blue-600'}`}
          activeOpacity={0.8}
        >
          <View className="flex-row justify-center items-center">
            {loading && <ActivityIndicator color="white" size="small" className="mr-2" />}
            <Text className="text-white font-bold text-center">
              {loading ? "Logging In..." : "Login"}
            </Text>
          </View>
        </TouchableOpacity>
        {error && (
          <View className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <Text className="text-red-600 text-center">
              Login failed. Please check your information.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Login;