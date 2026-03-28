import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import { 
  Star, 
  MapPin, 
  MessageCircle,
  Heart,
  Share,
  Check
} from 'lucide-react-native';
import colors from '@/constants/colors';
import { mockProviders } from '@/data/mockData';
import { Provider, Package } from '@/types';
import { useAuthContext } from '@/contexts/AuthContext';

export default function ProviderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (id) {
      const found = mockProviders.find(p => p.id === id);
      setProvider(found || null);
    }
  }, [id]);

  if (!provider) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: 'Furnizor', headerShown: true }} />
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Furnizorul nu a fost găsit</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleBooking = () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Conectare necesară',
        'Pentru a face o rezervare, trebuie să te conectezi la cont.',
        [
          { text: 'Anulează', style: 'cancel' },
          { text: 'Conectează-te', onPress: () => {} }
        ]
      );
      return;
    }

    if (!selectedPackage) {
      Alert.alert('Selectează un pachet', 'Te rog selectează un pachet pentru a continua.');
      return;
    }

    Alert.alert(
      'Rezervare trimisă',
      'Cererea ta de rezervare a fost trimisă furnizorului. Vei primi un răspuns în curând.',
      [{ text: 'OK' }]
    );
  };

  const handleMessage = () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Conectare necesară',
        'Pentru a trimite mesaje, trebuie să te conectezi la cont.'
      );
      return;
    }
    
    Alert.alert('Mesaj trimis', 'Mesajul tău a fost trimis furnizorului.');
  };

  const renderPackage = ({ item }: { item: Package }) => (
    <TouchableOpacity
      style={[
        styles.packageCard,
        selectedPackage?.id === item.id && styles.packageCardSelected
      ]}
      onPress={() => setSelectedPackage(item)}
    >
      <View style={styles.packageHeader}>
        <Text style={styles.packageName}>{item.name}</Text>
        <Text style={styles.packagePrice}>{item.price} RON</Text>
      </View>
      <Text style={styles.packageDescription}>{item.description}</Text>
      <Text style={styles.packageDuration}>Durată: {item.duration}</Text>
      
      <View style={styles.packageFeatures}>
        {item.features.map((feature) => (
          <View key={feature} style={styles.featureRow}>
            <Check size={16} color={colors.success} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      
      {selectedPackage?.id === item.id && (
        <View style={styles.selectedIndicator}>
          <Check size={20} color={colors.white} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: provider.businessName,
          headerShown: true,
          headerRight: () => (
            <View style={styles.headerActions}>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={() => setIsFavorite(!isFavorite)}
              >
                <Heart 
                  size={24} 
                  color={isFavorite ? colors.secondary : colors.gray[600]}
                  fill={isFavorite ? colors.secondary : 'none'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Share size={24} color={colors.gray[600]} />
              </TouchableOpacity>
            </View>
          )
        }} 
      />
      
      <ScrollView style={styles.content}>
        {/* Image Gallery */}
        <FlatList
          data={provider.images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />

        <View style={styles.info}>
          {/* Basic Info */}
          <View style={styles.basicInfo}>
            <Text style={styles.businessName}>{provider.businessName}</Text>
            
            <View style={styles.locationRow}>
              <MapPin size={16} color={colors.gray[500]} />
              <Text style={styles.location}>{provider.location}</Text>
            </View>
            
            <View style={styles.ratingRow}>
              <Star size={16} color={colors.warning} fill={colors.warning} />
              <Text style={styles.rating}>{provider.rating}</Text>
              <Text style={styles.reviewCount}>({provider.reviewCount} recenzii)</Text>
              {provider.verified && (
                <View style={styles.verifiedBadge}>
                  <Check size={12} color={colors.white} />
                  <Text style={styles.verifiedText}>Verificat</Text>
                </View>
              )}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Despre noi</Text>
            <Text style={styles.description}>{provider.description}</Text>
          </View>

          {/* Packages */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pachete și Prețuri</Text>
            <FlatList
              data={provider.packages}
              renderItem={renderPackage}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>

          {/* Contact Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
              <MessageCircle size={20} color={colors.primary} />
              <Text style={styles.messageButtonText}>Trimite mesaj</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
              <Text style={styles.bookButtonText}>
                {selectedPackage ? `Rezervă - ${selectedPackage.price} RON` : 'Selectează pachet'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 18,
    color: colors.gray[600],
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    padding: 8,
  },
  image: {
    width: 300,
    height: 250,
    marginRight: 8,
  },
  info: {
    padding: 16,
  },
  basicInfo: {
    marginBottom: 24,
  },
  businessName: {
    fontSize: 24,
    fontWeight: 'bold',
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
    fontSize: 16,
    color: colors.gray[600],
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  reviewCount: {
    fontSize: 16,
    color: colors.gray[500],
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
    gap: 4,
  },
  verifiedText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.gray[700],
    lineHeight: 24,
  },
  packageCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.gray[200],
    position: 'relative',
  },
  packageCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  packageName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  packagePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  packageDescription: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
  },
  packageDuration: {
    fontSize: 14,
    color: colors.gray[500],
    marginBottom: 12,
  },
  packageFeatures: {
    gap: 6,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: colors.gray[700],
  },
  selectedIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    gap: 12,
    paddingBottom: 20,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});