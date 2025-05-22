import { Link, Stack } from 'expo-router';
import { View } from 'react-native';

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View>
        <Link href="/(tabs)/showcase">Go to home screen</Link>
      </View>
    </>
  );
};

export default NotFoundScreen;
