import React from 'react';
import {View,Text,FlatList,Image, Pressable,StyleSheet,} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTravel } from '../../context/TravelContext';
import { Place } from '../../data/placeData';

export default function BucketListScreen() {
  const { bucketList, toggleBucketList } = useTravel();
  const router = useRouter();

  const renderSavedItem = ({ item }: { item: Place }) => (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/place/${item.id}`)}
    >
      <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.sub}>{item.district} • {item.category}</Text>
      </View>
      <Pressable
        style={styles.removeBtn}
        onPress={() => toggleBucketList(item)}
      >
        <Ionicons name="trash-outline" size={20} color="#EF4444" />
      </Pressable>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {bucketList.length === 0 ? (
        <View style={styles.emptyBox}>
          <Ionicons name="map-outline" size={60} color="#94A3B8" />
          <Text style={styles.emptyTitle}>Your Bucket List is Empty</Text>
          <Text style={styles.emptySub}>
            Explore Sri Lankan destinations and bookmark places you wish to visit!
          </Text>
        </View>
      ) : (
        <FlatList
          data={bucketList}
          keyExtractor={(item) => item.id}
          renderItem={renderSavedItem}
          contentContainerStyle={{ paddingVertical: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9', paddingHorizontal: 16 },
  emptyBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#334155', marginTop: 12 },
  emptySub: { fontSize: 14, color: '#64748B', textAlign: 'center', marginTop: 6 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
  },
  thumbnail: { width: 70, height: 70, borderRadius: 10 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#0F172A' },
  sub: { fontSize: 13, color: '#64748B', marginTop: 4 },
  removeBtn: { padding: 8 },
});