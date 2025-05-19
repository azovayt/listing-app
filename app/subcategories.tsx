import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import CustomHeader from '../src/components/CustomHeader';
import Ionicons from '@expo/vector-icons/Ionicons';

const PUBLIC_URL = 'http://195.85.207.74:1337';

interface SubCategory {
  id: number;
  name: string;
  icon: string;
}

export default function SubCategoryScreen() {
  const { categoryId } = useLocalSearchParams();
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [categoryName, setCategoryName] = useState('Alt Kategoriler');
  const [loading, setLoading] = useState(true);

  const fetchCategoryName = async () => {
    try {
      const response = await fetch(
        `${PUBLIC_URL}/api/categories?filters[id][$eq]=${categoryId}&populate=*`
      );
      if (!response.ok) {
        throw new Error(`HTTP hatası: ${response.status}`);
      }
      const data = await response.json();
      setCategoryName(data.data[0]?.title || 'Alt Kategoriler');
    } catch (error) {
      console.error('Kategori adı alınırken hata:', error);
      setCategoryName('Alt Kategoriler');
    }
  };

  const fetchSubCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${PUBLIC_URL}/api/subcategories?populate=*&filters[category][id][$eq]=${categoryId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP hatası: ${response.status}`);
      }
      const data = await response.json();
      setSubCategories(data.data || []);
    } catch (error) {
      console.error('Alt kategoriler alınırken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchCategoryName();
      fetchSubCategories();
    }
  }, [categoryId]);

  const handleSeeAllProducts = () => {
    router.push({
      pathname: '/products',
      params: { categoryId, categoryName },
    });
  };

  const handleSubProductPress = (subCategory: SubCategory) => {
    router.push({
      pathname: '/products',
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
      {loading ? (
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