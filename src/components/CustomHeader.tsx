import { View, Image, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CustomHeaderProps {
  title: string;
  onBackPress?: () => void;
  logo?: boolean;
  rightButtonText?: string;
  onRightPress?: () => void;
}

const CustomHeader = ({ title, onBackPress, logo, rightButtonText, onRightPress }: CustomHeaderProps) => {
  return (
      <SafeAreaView className="bg-mycolor2">
        <View className="flex-row items-center justify-between px-4 py-3">
          <View className="w-16 items-start">
            {logo && (
              <Image
                source={require('../../assets/S-Logo1.png')}
                className="w-10 h-10"
                resizeMode="contain"
              />
            )}
            {onBackPress && !logo && (
              <TouchableOpacity
                onPress={onBackPress}
                className="p-2"
                accessibilityRole="button"
                accessibilityLabel="Back"
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
          <View className="flex-1 items-center">
            <Text
              className="text-lg font-bold text-white text-center"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
          </View>
          <View className="w-16 items-end">
            {rightButtonText && onRightPress && (
              <TouchableOpacity
                onPress={onRightPress}
                className="p-2"
                accessibilityRole="button"
                accessibilityLabel={rightButtonText}
              >
                <Text className="text-white text-sm font-medium">
                  {rightButtonText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
  );
};

export default CustomHeader;