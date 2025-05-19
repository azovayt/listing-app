import { Tabs } from 'expo-router';
import { getTabScreenOptions } from '../../src/components/TabNavigator';

const TabLayout = () => {
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
            name: 'index',
            title: 'Showcase', 
            iconName: 'grid-outline',
            headerShown: false
          })}/>
      <Tabs.Screen 
        name="(search)"
        options={getTabScreenOptions({
            name: '(search)',
            title: 'Search', 
            iconName: 'search',
            headerShown: false
          })}/>
      <Tabs.Screen
        name="post-ad"
        options={getTabScreenOptions({
            name: 'post-ad',
            title: 'Post Ad',
            iconName: 'add',
            headerShown: false
          })}/>
      <Tabs.Screen
        name="services"
        options={getTabScreenOptions({
            name: 'services',
            title: 'Services', 
            iconName: 'construct',
            headerShown: false
          })}/>
      <Tabs.Screen
        name="personalized"
        options={getTabScreenOptions({
            name: 'personalized',
            title: 'Personalized',
            iconName: 'person',
            headerShown: false
          })}/>
    </Tabs>
  );
}

export default TabLayout;