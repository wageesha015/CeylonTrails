import { ImageSourcePropType } from 'react-native';

export interface Place {
  id: string;
  name: string;
  district: string;
  province: string;
  category: 'Heritage' | 'Beach' | 'Nature' | 'Wildlife';
  entryFee: string;
  bestTime: string;
  rating: string;
  image: ImageSourcePropType;
  description: string;
}

export const PLACES_DATA: Place[] = [
  {
    id: '1',
    name: 'Nine Arches Bridge',
    district: 'Badulla',
    province: 'Uva',
    category: 'Heritage',
    entryFee: 'Free',
    bestTime: '6:30 AM - 9:30 AM',
    rating: '4.9',
    image: require('../assets/nine-arches.jpg'),
    description: 'An iconic colonial-era railway bridge in Ella surrounded by lush green tea plantations and misty hills. Famous for watching the blue train pass through.'
  },
  {
    id: '2',
    name: 'Sigiriya Lion Rock',
    district: 'Matale',
    province: 'Central',
    category: 'Heritage',
    entryFee: 'LKR 1,000 (Local) / $30 (Foreign)',
    bestTime: '7:00 AM - 10:00 AM',
    rating: '4.9',
    image: require('../assets/sigiriya.jpg'),
    description: 'An ancient rock fortress and UNESCO World Heritage site featuring frescoes, the Mirror Wall, and breathtaking 360-degree views from the summit.'
  },
  {
    id: '3',
    name: 'Mirissa Beach & Coconut Tree Hill',
    district: 'Matara',
    province: 'Southern',
    category: 'Beach',
    entryFee: 'Free',
    bestTime: '4:30 PM - 6:15 PM',
    rating: '4.8',
    image: require('../assets/mirissa.jpg'),
    description: 'A crescent-shaped tropical beach renowned for surfing, whale watching, and sunset views from the famous palm-covered headland.'
  },
  {
    id: '4',
    name: 'Horton Plains & World’s End',
    district: 'Nuwara Eliya',
    province: 'Central',
    category: 'Nature',
    entryFee: 'LKR 600 (Local)',
    bestTime: '6:00 AM - 9:00 AM',
    rating: '4.8',
    image: require('../assets/hortonplains.jpg'),
    description: 'A misty highland plateau featuring cloud forests, Baker’s Falls, and a sheer 880-meter cliff drop offering views all the way to the southern coast.'
  },
  {
    id: '5',
    name: 'Galle Dutch Fort',
    district: 'Galle',
    province: 'Southern',
    category: 'Heritage',
    entryFee: 'Free',
    bestTime: '4:00 PM - 6:30 PM',
    rating: '4.7',
    image: require('../assets/gallfort.jpg'),
    description: 'A historic 17th-century fortified town blending Dutch-colonial architecture, cobblestone streets, boutique cafes, and ocean ramparts.'
  },
  {
    id: '6',
    name: 'Yala National Park',
    district: 'Hambantota',
    province: 'Southern',
    category: 'Wildlife',
    entryFee: 'LKR 10,500 + Safari Jeep',
    bestTime: '6:00 AM - 10:00 AM',
    rating: '4.7',
    image: require('../assets/yala.jpg'),
    description: 'Sri Lanka’s most visited wildlife sanctuary, famous for having one of the highest leopard densities in the world alongside elephants and sloth bears.'
  }
];