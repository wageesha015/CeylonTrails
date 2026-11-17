import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTravel } from '../../context/TravelContext';

export default function TabLayout() {
  const { bucketList } = useTravel();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0F766E',
        tabBarInactiveTintColor: '#64748B',
        headerStyle: { backgroundColor: '#0F766E' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'CeylonTrails',
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="compass"
              size={size}
              color={typeof color === 'number' ? '#64748B' : color ?? '#64748B'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bucketlist"
        options={{
          title: 'My Bucket List',
          tabBarLabel: 'Bucket List',
          tabBarBadge: bucketList.length > 0 ? bucketList.length : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="bookmark"
              size={size}
              color={typeof color === 'number' ? '#64748B' : color ?? '#64748B'}
            />
          ),
        }}
      />
    </Tabs>
  );
}