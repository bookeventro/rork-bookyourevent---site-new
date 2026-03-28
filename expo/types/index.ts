export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  type: 'client' | 'provider';
  createdAt: string;
}

export interface Provider {
  id: string;
  userId: string;
  businessName: string;
  category: ServiceCategory;
  description: string;
  location: string;
  images: string[];
  rating: number;
  reviewCount: number;
  priceRange: string;
  packages: Package[];
  availability: AvailabilitySlot[];
  verified: boolean;
  createdAt: string;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
}

export interface AvailabilitySlot {
  date: string;
  available: boolean;
}

export interface Booking {
  id: string;
  clientId: string;
  providerId: string;
  packageId: string;
  eventDate: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  message: string;
  totalPrice: number;
  createdAt: string;
}

export interface Review {
  id: string;
  bookingId: string;
  clientId: string;
  providerId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export type ServiceCategory = 
  | 'band'
  | 'dj' 
  | 'venue'
  | 'photographer'
  | 'videographer'
  | 'candybar'
  | 'catering'
  | 'decoration';

export interface SearchFilters {
  category?: ServiceCategory;
  location?: string;
  date?: string;
  priceRange?: [number, number];
  rating?: number;
}