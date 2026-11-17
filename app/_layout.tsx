import { Stack } from 'expo-router';
import { TravelProvider } from '../context/TravelContext';

export default function RootLayout() {
  return (
    <TravelProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="place/[id]"
          options={{
            title: 'Destination Details',
            headerTintColor: '#0F766E',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </TravelProvider>
  );
}