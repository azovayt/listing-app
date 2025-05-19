import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import CustomHeader from '../../src/components/CustomHeader';
import ProductList from '../../src/components/ProductList';
import useFetch from '../../src/hooks/useFetch';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: {
    url: string;
  };
}

const ShowCase = () => {
  const { data: listings, loading, error } = useFetch<Product>('products', {
    'populate': '*',
    'filters[showCase][$eq]': 'true',
  });

  return (
    <View className='flex-1 bg-gray-100'>
      <CustomHeader title='Showcase' logo={true} />
      {error ? (
        <View className='flex-1 justify-center items-center'>
          <Text className='text-center text-red-500'>{error}</Text>
        </View>
      ) : loading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' color='gray' />
          <Text className='mt-2 text-gray-500'>Yükleniyor...</Text>
        </View>
      ) : listings.length === 0 ? (
        <View className='flex-1 justify-center items-center'>
          <Text className='text-center text-gray-500'>Ürün bulunamadı...</Text>
        </View>
      ) : (
        <FlatList
          className='px-2'
          numColumns={2}
          data={listings}
          renderItem={({ item }) => (
            <View className='w-1/2 p-1'>
              <ProductList product={item} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
};

export default ShowCase;