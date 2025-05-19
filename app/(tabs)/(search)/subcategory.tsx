// app/(tabs)/(search)/index.tsx
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import CustomHeader from '../../../src/components/CustomHeader';
import Ionicons from '@expo/vector-icons/Ionicons';

const PUBLIC_URL = process.env.EXPO_PUBLIC_URL;

interface SubCategory {
  id: number;
  name: string;
  icon: string;
}

export default function SubCategory() {
  const { categoryId } = useLocalSearchParams();
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categoryName, setCategoryName] = useState('Alt Kategoriler');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${PUBLIC_URL}/api/subcategories?populate[category][fields][0]=title&filters[category][id][$eq]=${categoryId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP hatası: ${response.status}`);
      }
      const data = await response.json();
      const subCategoriesData = data.data || [];
      const categoryTitle = data.data[0]?.category?.title || 'Alt Kategoriler';

      setSubCategories(subCategoriesData);
      setCategoryName(categoryTitle);
      setError(null);
    } catch (error) {
      console.error('Veri alınırken hata:', error);
      setError('Veriler yüklenemedi.');
      setCategoryName('Alt Kategoriler');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchData();
    }
  }, [categoryId]);

  const handleSeeAllProducts = () => {
    router.push({
      pathname: '/categoryproducts',
      params: { categoryId, categoryName },
    });
  };

  const handleSubProductPress = (subCategory: SubCategory) => {
    router.push({
      pathname: '/categoryproducts',
      params: { subCategoryId: subCategory.id, subCategoryName: subCategory.name },
    });
  };

  const renderSubCategory = ({ item }: { item: SubCategory }) => (
    <TouchableOpacity
      onPress={() => handleSubProductPress(item)}
      className="flex-row items-center py-3 border-b border-gray-300"
    >
      <Text className="text-xl">{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color="gray" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <CustomHeader
        title={categoryName}
        logo={false}
        onBackPress={() => router.back()}
      />
      <TouchableOpacity
        onPress={handleSeeAllProducts}
        className="p-3 flex-row items-center justify-between border-b border-gray-300"
      >
        <Text className="text-base font-medium">{`${categoryName} Listesi`}</Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>
      {error ? (
        <Text className="text-center mt-4 text-red-500">{error}</Text>
      ) : loading ? (
        <Text className="text-center mt-4">Yükleniyor...</Text>
      ) : subCategories.length === 0 ? (
        <Text className="text-center mt-4">Alt kategori bulunamadı.</Text>
      ) : (
        <FlatList
          data={subCategories}
          renderItem={renderSubCategory}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
          className="px-2"
        />
      )}
    </View>
  );
}