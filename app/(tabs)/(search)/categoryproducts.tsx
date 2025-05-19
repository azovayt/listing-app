// app/(tabs)/(search)/categoryproducts.tsx
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import CustomHeader from '../../../src/components/CustomHeader';

const PUBLIC_URL = process.env.EXPO_PUBLIC_URL;

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
}

export default function CategoryProductsScreen() {
  const { categoryId, categoryName, subCategoryId, subCategoryName } = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = `${PUBLIC_URL}/api/products?populate=*`;
      if (subCategoryId) {
        url += `&filters[subcategory][id][$eq]=${subCategoryId}`;
      } else if (categoryId) {
        url += `&filters[category][id][$eq]=${categoryId}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP hatası: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data.data || []);
      setError(null);
    } catch (error) {
      console.error('Ürünler alınırken hata:', error);
      setError('Ürünler yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId, subCategoryId]);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => {
        console.log('Ürün:', item.title);
      }}
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
        title={(subCategoryName || categoryName || 'Ürünler') as string}
        logo={false}
        onBackPress={() => router.push("/(search)")}
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