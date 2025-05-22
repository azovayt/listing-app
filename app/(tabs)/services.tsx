import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../../src/components/CustomHeader';
import useFetch from '../../src/hooks/useFetch';

interface Service {
  id: number;
  name: string;
  description: string;
}

const truncateDescription = (text: string) =>
  text.length > 150 ? `${text.substring(0, 150)}...` : text;

const Services = () => {
  const { data: services, loading, error } = useFetch<Service>('services');

  const renderService = ({ item }: { item: Service }) => (
    <TouchableOpacity
      className='flex-row items-center bg-white p-4 mb-3 rounded-lg shadow-sm'
      onPress={() => {}}
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
      {error ? (
        <View className='flex-1 justify-center items-center'>
          <Text className='text-center text-red-500'>{error}</Text>
        </View>
      ) : loading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' color='#4B5563' />
          <Text className='mt-2 text-gray-500'>Loading...</Text>
        </View>
      ) : services.length === 0 ? (
        <View className='flex-1 justify-center items-center'>
          <Text className='text-center text-gray-500'>Service not found.</Text>
        </View>
      ) : (
        <FlatList
          data={services}
          renderItem={renderService}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 12 }}
        />
      )}
    </View>
  );
};

export default Services;