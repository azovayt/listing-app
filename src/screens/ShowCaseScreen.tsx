import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../components/CustomHeader';
import ProductList from '../components/ProductList';

const PUBLIC_URL = process.env.EXPO_PUBLIC_URL;

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: {
    url: string;
  };
}

const ShowCaseScreen = () => {
  const [listings, setListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${PUBLIC_URL}/api/products?populate=*&filters[showCase][$eq]=true`);
      if (!response.ok) {
        throw new Error('Hata oluştu');
      }
      const data = await response.json();
      setListings(data.data);
    } catch (error) {
      console.error('Hata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View className='flex-1 bg-gray-100'>
      <CustomHeader title='Showcase' logo={true} />
      {loading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size='large' color='gray' />
          <Text className='mt-2 text-gray-500'>Yükleniyor...</Text>
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
          ListEmptyComponent={<Text className='text-center text-gray-500'>Ürün bulunamadı...</Text>}
        />
      )}
    </View>
  );
};

export default ShowCaseScreen;