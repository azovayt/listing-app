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
  onPress?: (id: number) => void;
}

const ProductList = ({ product, onPress }: ProductListProps) => {
  const imageUrl = product.image?.url ? `${PUBLIC_URL}${product.image.url}` : undefined;

  return (
    <TouchableOpacity
      className=" flex-1 bg-white border border-gray-200 rounded-xl mx-3 my-2 shadow-sm"
      onPress={() => onPress?.(product.id)}
      activeOpacity={0.7}
    >
      <View className="flex-row h-28">
        <View className="w-[30%]">
          <Image
            source={imageUrl ? { uri: imageUrl } : require('../../assets/Placeholder.png')}
            className="w-full h-full rounded-l-xl"
            resizeMode="stretch"
            defaultSource={require('../../assets/Placeholder.png')} // Yerel yedek resim
            onError={(e) => console.log('Resim yükleme hatası:', e.nativeEvent.error)}
          />
        </View>
        <View className="flex-1 justify-between mx-2 my-2">
          <Text 
            className="text-base font-semibold text-gray-800"
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {product.title || 'İsimsiz Ürün'}
          </Text>
          <View className="flex-row justify-between items-center">
            <View className="flex-row flex-1 items-center">
              <Text 
                className="text-xs text-gray-500"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {[
                  product.city,
                  product.district,
                  product.neighborhood
                ]
                  .filter(Boolean)
                  .join(', ')}
              </Text>
            </View>
            <Text className="text-sm font-bold text-mycolor2 ml-1">
              {`${product.price.toLocaleString()} TL`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;