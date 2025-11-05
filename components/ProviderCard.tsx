import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Star, MapPin } from 'lucide-react-native';
import { router } from 'expo-router';
import colors from '@/constants/colors';
import { Provider } from '@/types';

interface ProviderCardProps {
  provider: Provider;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  const handlePress = () => {
    router.push(`/provider/${provider.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: provider.images[0] }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.businessName}>{provider.businessName}</Text>
        
        <View style={styles.locationRow}>
          <MapPin size={16} color={colors.gray[500]} />
          <Text style={styles.location}>{provider.location}</Text>
        </View>
        
        <View style={styles.ratingRow}>
          <Star size={16} color={colors.warning} fill={colors.warning} />
          <Text style={styles.rating}>{provider.rating}</Text>
          <Text style={styles.reviewCount}>({provider.reviewCount} recenzii)</Text>
        </View>
        
        <Text style={styles.priceRange}>{provider.priceRange}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  businessName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: colors.gray[600],
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.gray[500],
  },
  priceRange: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});