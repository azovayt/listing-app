import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import CustomHeader from '../../../src/components/CustomHeader';
import useFetch from '../../../src/hooks/useFetch';
import ProductList from '../../../src/components/ProductList';

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

const CategoryProducts = () => {
  const { categoryId, categoryName, subCategoryId, subCategoryName } = useLocalSearchParams();
  const queryParams: Record<string, string> = { 'populate': '*' };
  if (subCategoryId) {
    queryParams['filters[subcategory][id][$eq]'] = subCategoryId as string;
  } else if (categoryId) {
    queryParams['filters[category][id][$eq]'] = categoryId as string;
  }

  const { data: products, loading, error } = useFetch<Product>('products', queryParams);

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
          renderItem={({ item }) => (
            <View>
              <ProductList product={item} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
}

export default CategoryProducts;