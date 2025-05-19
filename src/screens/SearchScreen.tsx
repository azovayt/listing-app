import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

const PUBLIC_URL = process.env.EXPO_PUBLIC_URL;

interface Category {
  id: number;
  title: string;
  color: string; 
  icon: string; 
}

function SearchScreen() {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${PUBLIC_URL}/api/categories?populate=*`);
      if (!response.ok) {
        throw new Error('Hata oluştu');
      }
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryPress = (categoryId: number, categoryName: string) => {
    router.push({
      pathname: '/subcategories',
      params: { categoryId: categoryId.toString(), categoryTitle: categoryName },
    });
  };

  // Her kategori için render fonksiyonu
  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item.id, item.title)} className='w-1/2 p-1'>
      <View className='flex-row items-center p-3 border border-gray-300 rounded-lg bg-white'>
        <View className='rounded-full p-3 mr-3' style={{ backgroundColor: item.color }}>
          <Ionicons name={item.icon as any} size={20} color='white'/>
        </View>
        <Text className='text-sm font-bold flex-1' numberOfLines={2} ellipsizeMode='tail'>
          {item.title || 'Kategori yok'}
        </Text>
        <Ionicons name='chevron-forward' size={20} color='gray' />
      </View>
    </TouchableOpacity>
  );

  return (
    <View className='flex-1 bg-gray-100'>
      <CustomHeader title='Search' logo={true} />
      <TextInput
        placeholder='Search'
        className='h-12 border border-gray-300 px-3 my-4 mx-4 rounded-lg'
      />
      <FlatList
        className='px-2'
        numColumns={2}
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
        ListEmptyComponent={<Text className='text-center text-gray-500'>Kategori bulunamadı...</Text>}
      />
    </View>
  );
};

export default SearchScreen;