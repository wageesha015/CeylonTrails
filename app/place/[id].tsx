import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PLACES_DATA } from '../../data/placeData';
import { useTravel } from '../../context/TravelContext';

export default function PlaceDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isSaved, toggleBucketList } = useTravel();

  const place = PLACES_DATA.find((item) => item.id === id);

  if (!place) {
    return (
      <View style={styles.center}>
        <Text>Destination not found.</Text>
      </View>
    );
  }

  const saved = isSaved(place.id);

  const handleBookmarkAndNotify = async () => {
    const adding = !saved;
    toggleBucketList(place);

    if (adding) {
      try {
        // Import only local notification submodules to prevent ExpoApplication crash in Expo Go
        const { scheduleNotificationAsync } = await import(
          'expo-notifications/build/scheduleNotificationAsync'
        );
        const { setNotificationHandler } = await import(
          'expo-notifications/build/NotificationsHandler'
        );
        const { requestPermissionsAsync } = await import(
          'expo-notifications/build/NotificationPermissions'
        );

        setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
            shouldShowBanner: true,
            shouldShowList: true,
          }),
        });

        await requestPermissionsAsync();
        await scheduleNotificationAsync({
          content: {
            title: 'Destination Bookmarked! 🇱🇰',
            body: `${place.name} (${place.district}) has been added to your CeylonTrails bucket list!`,
          },
          trigger: null,
        });
      } catch (error) {
        Alert.alert(
          'Destination Bookmarked! 🇱🇰',
          `${place.name} (${place.district}) has been added to your CeylonTrails bucket list!`
        );
      }
    } else {
      Alert.alert('Removed', `${place.name} removed from your bucket list.`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={typeof place.image === 'string' ? { uri: place.image } : place.image} style={styles.heroImage} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.category}>{place.category}</Text>
          <View style={styles.ratingBox}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={styles.ratingText}>{place.rating}</Text>
          </View>
        </View>

        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.location}>
          <Ionicons name="location" size={16} color="#0F766E" /> {place.district}, {place.province} Province
        </Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="ticket-outline" size={20} color="#0F766E" />
            <Text style={styles.infoText}>Entry Fee: {place.entryFee}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color="#0F766E" />
            <Text style={styles.infoText}>Best Time: {place.bestTime}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About this Destination</Text>
        <Text style={styles.description}>{place.description}</Text>

        <Pressable
          style={[styles.actionBtn, saved && styles.savedBtn]}
          onPress={handleBookmarkAndNotify}
        >
          <Ionicons
            name={saved ? 'checkmark-circle' : 'notifications'}
            size={22}
            color="#FFFFFF"
          />
          <Text style={styles.actionBtnText}>
            {saved ? 'Saved in Bucket List' : 'Add to Bucket List & Remind Me'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heroImage: { width: '100%', height: 260 },
  content: { padding: 20 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    color: '#0F766E',
    fontWeight: 'bold',
    fontSize: 13,
    textTransform: 'uppercase',
  },
  ratingBox: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontWeight: 'bold', color: '#334155', fontSize: 14 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0F172A', marginTop: 6 },
  location: { fontSize: 14, color: '#64748B', marginTop: 4, marginBottom: 16 },
  infoCard: {
    backgroundColor: '#F0FDFA',
    padding: 14,
    borderRadius: 12,
    gap: 10,
    marginBottom: 18,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoText: { fontSize: 14, color: '#115E59', fontWeight: '600' },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: '#0F172A', marginBottom: 8 },
  description: { fontSize: 15, color: '#475569', lineHeight: 22, marginBottom: 24 },
  actionBtn: {
    flexDirection: 'row',
    backgroundColor: '#0F766E',
    paddingVertical: 15,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  savedBtn: { backgroundColor: '#334155' },
  actionBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});