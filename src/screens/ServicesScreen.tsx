import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const PUBLIC_URL = process.env.EXPO_PUBLIC_URL;

// Type dönüşümü için
interface Service {
  id: number;
  name: string;
  description: string;
}

// Açıklama metnini kısaltmak için
const truncateDescription = (text: string) =>
  text.length > 150 ? `${text.substring(0, 150)}...` : text;

const ServicesScreen = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  // API'den verileri çekmek için
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${PUBLIC_URL}/api/services`);
      
      if (!response.ok) {
        throw new Error('Hata oluştu');
      }
      const data = await response.json();
      setServices(data.data);
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Servis kartını render etmek ve kod düzeni için
  const renderService = ({ item }: { item: Service }) => (
    <TouchableOpacity
      className='flex-row items-center bg-white p-4 mb-3 rounded-lg shadow-sm'
      onPress={() => console.log(`Tıklanan servis: ${item.name}`)} // Tıklama testi için
    >
      <Ionicons name='build' size={24} color='#4B5563' className='mr-3' />
      <View className='flex-1'>
        <Text className='text-lg font-bold text-blue-600'>{item.name}</Text>
        <Text className='text-gray-500 mt-1 text-sm'>{truncateDescription(item.description)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className='flex-1 bg-gray-100'>
      <CustomHeader title='Services' logo={true} />
      {loading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' color='#4B5563' />
          <Text className='mt-2 text-gray-500'>Yükleniyor...</Text>
        </View>
      ) : (
        <FlatList // Listenin performası için
          data={services}
          renderItem={renderService}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 12 }}
          ListEmptyComponent={<Text className='text-center text-gray-500'>Servis bulunamadı.</Text>}
        />
      )}
    </View>
  );
};

export default ServicesScreen;