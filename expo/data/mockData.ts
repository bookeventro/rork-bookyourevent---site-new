import { Provider, ServiceCategory, User } from '@/types';

export const categories: { id: ServiceCategory; name: string; icon: string }[] = [
  { id: 'band', name: 'Formații', icon: 'music' },
  { id: 'dj', name: 'DJ', icon: 'disc' },
  { id: 'venue', name: 'Săli Evenimente', icon: 'building' },
  { id: 'photographer', name: 'Fotografi', icon: 'camera' },
  { id: 'videographer', name: 'Videografi', icon: 'video' },
  { id: 'candybar', name: 'Candy Bar', icon: 'cake' },
  { id: 'catering', name: 'Catering', icon: 'utensils' },
  { id: 'decoration', name: 'Decorațiuni', icon: 'sparkles' },
];

export const mockProviders: Provider[] = [
  {
    id: '1',
    userId: 'user1',
    businessName: 'Formația Harmony',
    category: 'band',
    description: 'Formație profesională cu experiență de peste 10 ani în evenimente private și corporate. Repertoriu variat: pop, rock, folk românesc.',
    location: 'București',
    images: [
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
    ],
    rating: 4.8,
    reviewCount: 127,
    priceRange: '2000-5000 RON',
    packages: [
      {
        id: 'p1',
        name: 'Pachet Standard',
        description: '4 ore de muzică live, sonorizare inclusă',
        price: 2500,
        duration: '4 ore',
        features: ['4 ore muzică live', 'Sonorizare profesională', '2 pauze de 15 min']
      },
      {
        id: 'p2', 
        name: 'Pachet Premium',
        description: '6 ore de muzică live, sonorizare și lumini',
        price: 4000,
        duration: '6 ore',
        features: ['6 ore muzică live', 'Sonorizare profesională', 'Lumini scenă', 'DJ între pauze']
      }
    ],
    availability: [],
    verified: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    userId: 'user2',
    businessName: 'DJ Alex Events',
    category: 'dj',
    description: 'DJ profesionist specializat în evenimente private. Echipament de ultimă generație și muzică pentru toate gusturile.',
    location: 'Cluj-Napoca',
    images: [
      'https://images.unsplash.com/photo-1571266028243-d220c9c3b2d2?w=800',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    ],
    rating: 4.9,
    reviewCount: 89,
    priceRange: '800-2000 RON',
    packages: [
      {
        id: 'p3',
        name: 'Pachet Basic',
        description: '4 ore DJ, sonorizare de bază',
        price: 1000,
        duration: '4 ore',
        features: ['4 ore DJ', 'Sonorizare', 'Playlist personalizată']
      }
    ],
    availability: [],
    verified: true,
    createdAt: '2024-02-01'
  },
  {
    id: '3',
    userId: 'user3',
    businessName: 'Salon Elegance',
    category: 'venue',
    description: 'Sală de evenimente elegantă în centrul Bucureștiului, capacitate 200 persoane. Decorațiuni incluse.',
    location: 'București',
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
    ],
    rating: 4.7,
    reviewCount: 156,
    priceRange: '3000-8000 RON',
    packages: [
      {
        id: 'p4',
        name: 'Închiriere Sală',
        description: 'Închiriere sală pentru o zi, decorațiuni de bază incluse',
        price: 5000,
        duration: '1 zi',
        features: ['Sală 200 persoane', 'Decorațiuni de bază', 'Sonorizare', 'Parcare']
      }
    ],
    availability: [],
    verified: true,
    createdAt: '2024-01-20'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'harmony@example.com',
    name: 'Formația Harmony',
    type: 'provider',
    createdAt: '2024-01-15'
  },
  {
    id: 'client1',
    email: 'maria@example.com', 
    name: 'Maria Popescu',
    type: 'client',
    createdAt: '2024-03-01'
  }
];

export const cities = [
  'București',
  'Cluj-Napoca', 
  'Timișoara',
  'Iași',
  'Constanța',
  'Craiova',
  'Brașov',
  'Galați',
  'Ploiești',
  'Oradea'
];