import { Stack } from 'expo-router';

const SearchLayout = () => {
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 400, 
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="subcategories" options={{ presentation: 'modal' }}/>
      <Stack.Screen name="categoryproducts" options={{ presentation: 'modal' }}/>
    </Stack>
  );
}

export default SearchLayout;