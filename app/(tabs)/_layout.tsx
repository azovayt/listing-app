import { Tabs } from 'expo-router';
import { getTabScreenOptions } from '../../src/components/TabNavigator';

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
        tabBarActiveTintColor: '#002f5e',
        tabBarInactiveTintColor: '#666666',
      }}
    >
      <Tabs.Screen
        name="index"
        options={getTabScreenOptions({ 
            title: 'Showcase', 
            iconName: 'grid-outline',
            headerShown: false
          })}/>
      <Tabs.Screen 
        name="search"
        options={getTabScreenOptions({
            title: 'Search', 
            iconName: 'search',
            headerShown: false
          })}/>
      <Tabs.Screen
        name="post-ad"
        options={getTabScreenOptions({
            title: 'Post Ad',
            iconName: 'add',
            headerShown: false
          })}/>
      <Tabs.Screen
        name="services"
        options={getTabScreenOptions({
            title: 'Services', 
            iconName: 'construct',
            headerShown: false
          })}/>
      <Tabs.Screen
        name="personalized"
        options={getTabScreenOptions({
            title: 'Personalized',
            iconName: 'person',
            headerShown: false
          })}/>
    </Tabs>
  );
}