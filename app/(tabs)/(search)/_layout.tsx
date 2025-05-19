// app/(tabs)/(search)/_layout.tsx
import { Stack } from 'expo-router';

export default function SearchLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="subcategory" />
      <Stack.Screen name="categoryproducts" />
    </Stack>
  );
}