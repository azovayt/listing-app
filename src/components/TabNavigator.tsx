import Ionicons from '@expo/vector-icons/Ionicons';

type TabScreenOptions = {
  title: string;
  iconName: string;
  headerShown?: boolean;
};

type TabBarIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

export const getTabScreenOptions = ({  title, iconName, headerShown = true }: TabScreenOptions) => ({
  title: title,
  
  headerShown: headerShown,
  tabBarIcon: ({ color, size, focused }: TabBarIconProps) => {
    return <Ionicons name={focused ? iconName : iconName} color={color} size={size}/>;
  },
});