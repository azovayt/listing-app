import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import CustomHeader from '../../src/components/CustomHeader';

const Personalized = () => {
  const [user, setUser] = useState<{ username?: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error while getting user information:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('jwt');
      await AsyncStorage.removeItem('user');
      router.push('/login');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <CustomHeader title="Personalized" logo={true} />
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : user ? (
        <View className="p-6">
          <View className="bg-gray-100 rounded-lg p-4 mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-2">User Information</Text>
            <View className="mb-2">
              <Text className="text-gray-600 font-medium">User name:</Text>
              <Text className="text-gray-800">{user.username || 'Belirtilmemiş'}</Text>
            </View>
            <View className="mb-2">
              <Text className="text-gray-600 font-medium">E-posta:</Text>
              <Text className="text-gray-800">{user.email || 'Belirtilmemiş'}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={handleLogout}
            className="bg-mycolor2 py-3 px-6 rounded-lg"
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-center">Log Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-600">User information not found.</Text>
        </View>
      )}
    </View>
  );
};

export default Personalized;