import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';

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

const ProductList = ({ product }: { product: Product }) => {
  const imageUrl = `${PUBLIC_URL}${product.image.url}`;
  return (
    <TouchableOpacity
      className='bg-white border border-gray-300 rounded-lg overflow-hidden'
    >
      <Image
        source={{ uri: imageUrl }}
        className='w-full h-32'
        resizeMode='cover'
      />
      <Text className='px-2 pt-2 font-bold'>
        {product.title}
      </Text>
      <Text className='px-2 pb-2 text-green-600'>
        {`${product.price} TL`}
      </Text>
    </TouchableOpacity>
  );
};

export default ProductList;