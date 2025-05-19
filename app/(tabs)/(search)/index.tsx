import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import CustomHeader from '../../../src/components/CustomHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import useFetch from '../../../src/hooks/useFetch';

interface Category {
  id: number;
  title: string;
  color: string;
  icon: string;
}

const Search = () => {
  const { data: categories, loading, error } = useFetch<Category>('categories', { 'populate': '*' });

  const handleCategoryPress = (categoryId: number, categoryName: string) => {
    router.push({
      pathname: 'subcategories',
      params: { categoryId: categoryId.toString(), categoryName },
    });
  };

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity onPress={() => handleCategoryPress(item.id, item.title)} className='w-1/2 p-1'>
      <View className='flex-row items-center p-3 border border-gray-300 rounded-lg bg-white'>
        <View className='rounded-full p-3 mr-3' style={{ backgroundColor: item.color }}>
          <Ionicons name={item.icon as any} size={20} color='white' />
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
      {error ? (
        <Text className='text-center mt-4 text-red-500'>{error}</Text>
      ) : loading ? (
        <Text className='text-center mt-4'>Yükleniyor...</Text>
      ) : categories.length === 0 ? (
        <Text className='text-center mt-4 text-gray-500'>Kategori bulunamadı...</Text>
      ) : (
        <FlatList
          className='px-2'
          numColumns={2}
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
}

export default Search;