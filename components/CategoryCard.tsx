import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import colors from '@/constants/colors';
import { ServiceCategory } from '@/types';

// Import all icons we need
import { 
  Music, 
  Disc, 
  Building, 
  Camera, 
  Video, 
  Cake, 
  Utensils, 
  Sparkles 
} from 'lucide-react-native';

const iconMap = {
  music: Music,
  disc: Disc,
  building: Building,
  camera: Camera,
  video: Video,
  cake: Cake,
  utensils: Utensils,
  sparkles: Sparkles,
};

interface CategoryCardProps {
  id: ServiceCategory;
  name: string;
  icon: keyof typeof iconMap;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, icon }) => {
  const IconComponent = iconMap[icon];

  const handlePress = () => {
    router.push(`/categories/${id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.iconContainer}>
        <IconComponent size={32} color={colors.primary} />
      </View>
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 120,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.gray[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
  },
});