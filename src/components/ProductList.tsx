import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

const PUBLIC_URL = process.env.EXPO_PUBLIC_URL;

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

interface ProductListProps {
  product: Product;
}

const ProductList = ({ product }: ProductListProps) => {
  const imageUrl = product.image?.url ? `${PUBLIC_URL}${product.image.url}` : undefined;

  return (
    <TouchableOpacity
      className="bg-white border border-gray-200 rounded-xl mx-4 my-2 p-3 flex-row items-center"
      
      activeOpacity={0.8}
    >
      <Image
        source={imageUrl ? { uri: imageUrl } : require('../../assets/Placeholder.png')}
        className="w-32 h-28 rounded-lg"
        resizeMode="cover"
        defaultSource={require('../../assets/Placeholder.png')}
      />
      <View className="flex-1 ml-3 justify-center">
        <Text className="text-lg font-semibold text-gray-800 mb-6" numberOfLines={2}>
          {product.title}
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-xs text-gray-500 flex-1" numberOfLines={1}>
            {[product.city, product.district, product.neighborhood].filter(Boolean).join(', ')}
          </Text>
          <Text className="text-sm font-bold text-blue-600 ml-2">
            {product.price.toLocaleString()} TL
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;