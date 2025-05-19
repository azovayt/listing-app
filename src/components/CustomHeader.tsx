import { View, Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

interface CustomHeaderProps {
  title: string;
  onBackPress?: () => void;
  logo?: boolean;
  rightButtonText?: string;
  onRightPress?: () => void;
}

const CustomHeader = ({title, onBackPress, logo, rightButtonText, onRightPress}: CustomHeaderProps) => {
  const sideBlockWidth = 'w-16'; // Sol ve sağ bloklar için bir genişlik

  return (
    <View className='flex-row items-center justify-between px-4 bg-mycolor2 h-20 top-0 left-0 z-10'>
      {/* Sol Kısım */}
      <View className={`${sideBlockWidth} items-start`}>
        {logo ? (
          <View>
            <Image source={require('../../assets/S-Logo1.png')} className='w-10 h-10' />
          </View>
        ) : onBackPress ? (
          <TouchableOpacity onPress={onBackPress} className='p-2'>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Orta Başlık Kısmı */}
      <View className='flex-1 items-center'>
        <Text className='text-lg font-bold text-white text-center' numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      </View>

      {/* Sağ Kısım */}
      <View className={`${sideBlockWidth} items-end`}>
        {rightButtonText ? (
          <TouchableOpacity onPress={onRightPress} className='p-2'>
            <Text className='text-white'>
              {rightButtonText}
            </Text>
          </TouchableOpacity>
        ) : null}
        {/*Sağda bir şey yoksa yer tutucu View genişliği koruması için*/}
      </View>
    </View>
  )
}

export default CustomHeader;