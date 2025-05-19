import { Stack } from 'expo-router';

const SearchLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="subcategories" />
      <Stack.Screen name="categoryproducts" />
    </Stack>
  );
}

export default SearchLayout;