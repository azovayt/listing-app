import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import CustomHeader from '../../src/components/CustomHeader';
import ProductList from '../../src/components/ProductList';
import useFetch from '../../src/hooks/useFetch';

interface Product {
  id: number;
  title: string;
  city: string;
  district: string;
  neighborhood: string;
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
    <View className="flex-1 bg-gray-100">
      <CustomHeader title="Showcase" logo={true} />
      {error ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-base">Hata: {error}</Text>
        </View>
      ) : loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#6B7280" />
          <Text className="mt-2 text-gray-500">Yükleniyor...</Text>
        </View>
      ) : listings.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-base">Ürün bulunamadı</Text>
        </View>
      ) : (
        <FlatList
          data={listings}
          renderItem={({ item }) => (
            <ProductList product={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
          className="flex-1"
          contentContainerStyle={{ paddingVertical: 8 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default ShowCase;