import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import CustomHeader from '../../../src/components/CustomHeader';
import useFetch from '../../../src/hooks/useFetch';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
}

const CategoryProducts = () => {
  const { categoryId, categoryName, subCategoryId, subCategoryName } = useLocalSearchParams();
  const queryParams: Record<string, string> = { 'populate': '*' };
  if (subCategoryId) {
    queryParams['filters[subcategory][id][$eq]'] = subCategoryId as string;
  } else if (categoryId) {
    queryParams['filters[category][id][$eq]'] = categoryId as string;
  }

  const { data: products, loading, error } = useFetch<Product>('products', queryParams);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => console.log('Ürün:', item.title)}
      className="p-4 border-b border-gray-300"
    >
      <Text className="text-lg font-medium">{item.title}</Text>
      <Text className="text-base text-gray-600">{item.price} ₺</Text>
      <Text className="text-sm text-gray-500">{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <CustomHeader
        title={(subCategoryName || categoryName) as string}
        logo={false}
        onBackPress={router.back}
      />
      {error ? (
        <Text className="text-center mt-4 text-red-500">{error}</Text>
      ) : loading ? (
        <Text className="text-center mt-4">Yükleniyor...</Text>
      ) : products.length === 0 ? (
        <Text className="text-center mt-4">Ürün bulunamadı.</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
          className="px-2"
        />
      )}
    </View>
  );
}

export default CategoryProducts;