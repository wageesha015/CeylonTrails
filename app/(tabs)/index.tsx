import React, { useState, useEffect, useRef } from 'react';
import {View,Text,FlatList,Image,Pressable,Modal,StyleSheet,AppState,AppStateStatus} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PLACES_DATA, Place } from '../../data/placeData';
import { useTravel } from '../../context/TravelContext';

const CATEGORIES = ['All', 'Heritage', 'Beach', 'Nature', 'Wildlife'];

export default function ExploreScreen() {
  const router = useRouter();
  const { isSaved, toggleBucketList } = useTravel();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const appState = useRef<AppStateStatus | null>(
    AppState.currentState as AppStateStatus | null
  );
  const [statusMessage, setStatusMessage] = useState<string>(
    'Discover hidden gems across Sri Lanka'
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current?.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const time = new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        setStatusMessage(`Welcome back! Travel feed refreshed at ${time}`);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const filteredPlaces =
    selectedCategory === 'All'
      ? PLACES_DATA
      : PLACES_DATA.filter((place) => place.category === selectedCategory);

  const renderPlaceCard = ({ item }: { item: Place }) => {
    const saved = isSaved(item.id);

    return (
      <View style={styles.card}>
        <Pressable onPress={() => router.push(`/place/${item.id}`)}>
          <Image
            source={typeof item.image === 'string' ? { uri: item.image } : item.image}
            style={styles.cardImage}
          />
        </Pressable>

        <View style={styles.cardContent}>
          <View style={styles.rowBetween}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>

            <Pressable
              hitSlop={15}
              onPress={() => toggleBucketList(item)}
              style={{ padding: 4 }}
            >
              <Ionicons
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={26}
                color={saved ? '#0F766E' : '#64748B'}
              />
            </Pressable>
          </View>

          <Pressable onPress={() => router.push(`/place/${item.id}`)}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.location}>
              <Ionicons name="location-outline" size={14} color="#64748B" />{' '}
              {item.district} District, {item.province} Province
            </Text>
            <Text style={styles.fee}>Entry: {item.entryFee}</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* AppState Status Banner */}
      <View style={styles.banner}>
        <Ionicons name="sparkles" size={16} color="#0F766E" />
        <Text style={styles.bannerText}>{statusMessage}</Text>
      </View>

      {/* Filter Header */}
      <View style={styles.filterHeader}>
        <Text style={styles.resultText}>
          Showing: <Text style={{ fontWeight: 'bold' }}>{selectedCategory}</Text> ({filteredPlaces.length})
        </Text>
        <Pressable
          style={styles.filterBtn}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="filter" size={16} color="#FFFFFF" />
          <Text style={styles.filterBtnText}>Filter</Text>
        </Pressable>
      </View>

      {/* Places FlatList */}
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id}
        renderItem={renderPlaceCard}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Filter Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Filter by Category</Text>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.modalOption,
                  selectedCategory === category && styles.modalOptionActive,
                ]}
                onPress={() => {
                  setSelectedCategory(category);
                  setModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedCategory === category && styles.modalOptionTextActive,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
            <Pressable
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeBtnText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9', paddingHorizontal: 16 },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CCFBF1',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  bannerText: { color: '#115E59', fontSize: 12, fontWeight: '600', flex: 1 },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12,
  },
  resultText: { fontSize: 14, color: '#334155' },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F766E',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  filterBtnText: { color: '#FFFFFF', fontWeight: '600', fontSize: 13 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  cardImage: { width: '100%', height: 170 },
  cardContent: { padding: 14 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  badge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: { color: '#0369A1', fontSize: 12, fontWeight: '700' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#0F172A', marginBottom: 4 },
  location: { fontSize: 13, color: '#64748B', marginBottom: 4 },
  fee: { fontSize: 13, color: '#0F766E', fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 14, color: '#0F172A' },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#F8FAFC',
  },
  modalOptionActive: { backgroundColor: '#0F766E' },
  modalOptionText: { fontSize: 15, color: '#334155', fontWeight: '500' },
  modalOptionTextActive: { color: '#FFFFFF', fontWeight: 'bold' },
  closeBtn: { marginTop: 8, alignItems: 'center', paddingVertical: 12 },
  closeBtnText: { color: '#EF4444', fontWeight: 'bold', fontSize: 15 },
});