import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import CustomHeader from '../../../src/components/CustomHeader';
import Ionicons from '@expo/vector-icons/Ionicons';
import useFetch from '../../../src/hooks/useFetch';

interface SubCategory {
  id: number;
  name: string;
  icon: string;
  color: string;
}

const SubCategories = () => {
  const { categoryId, categoryName } = useLocalSearchParams();
  const { data: subCategories, loading, error } = useFetch<SubCategory>('subcategories', {
    'filters[category][id][$eq]': categoryId as string,
    'fields[0]': 'name',
    'fields[1]': 'icon',
    'fields[2]': 'color',
  });

  const handleSeeAllProducts = () => {
    router.push({ pathname: 'categoryproducts', params: { categoryId, categoryName } });
  };

  const handleSubProductPress = (subCategory: SubCategory) => {
    router.push({
      pathname: 'categoryproducts',
      params: { subCategoryId: subCategory.id, subCategoryName: subCategory.name },
    });
  };

  const renderSubCategory = ({ item }: { item: SubCategory }) => (
    <TouchableOpacity
      onPress={() => handleSubProductPress(item)}
      className="flex-row items-center py-3 px-2 border-b border-gray-300"
    >
      <Ionicons name={item.icon as any} size={24} color={item.color} className="mr-3" />
      <Text className="text-xl flex-1">{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color="gray" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <CustomHeader
        title={typeof categoryName === 'string' && categoryName ? categoryName : 'Alt Kategoriler'}
        logo={false}
        onBackPress={router.back}
      />
      <TouchableOpacity
        onPress={handleSeeAllProducts}
        className="flex-row items-center justify-between p-3 border-b border-gray-300"
      >
        <Text className="text-base font-medium">
          {`${typeof categoryName === 'string' && categoryName ? categoryName : 'Alt Kategoriler'} Listesi`}
        </Text>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>
      {error ? (
        <Text className="text-center mt-4 text-red-500">{error}</Text>
      ) : loading ? (
        <Text className="text-center mt-4">Loading...</Text>
      ) : subCategories.length === 0 ? (
        <Text className="text-center mt-4">No subcategories found.</Text>
      ) : (
        <FlatList
          data={subCategories}
          renderItem={renderSubCategory}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
}

export default SubCategories;