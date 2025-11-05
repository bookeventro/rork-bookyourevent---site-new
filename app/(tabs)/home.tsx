import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  ImageBackground,
  FlatList
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Star, ArrowRight } from 'lucide-react-native';
import colors from '@/constants/colors';
import { SearchBar } from '@/components/SearchBar';
import { CategoryCard } from '@/components/CategoryCard';
import { ProviderCard } from '@/components/ProviderCard';
import { categories, mockProviders } from '@/data/mockData';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  
  const handleSearch = (query: string, location: string, date: string) => {
    console.log('Search:', { query, location, date });
    // Navigate to search results
    router.push('/search');
  };

  const featuredProviders = mockProviders.slice(0, 3);

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]} 
      showsVerticalScrollIndicator={false}
    >
        {/* Hero Section */}
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800' }}
          style={styles.hero}
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>BookYourEvent</Text>
            <Text style={styles.heroSubtitle}>
              Găsește furnizorii perfecți pentru evenimentul tău
            </Text>
          </View>
        </ImageBackground>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorii Servicii</Text>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <CategoryCard
                id={item.id}
                name={item.name}
                icon={item.icon as any}
              />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Providers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Furnizori Recomandați</Text>
            <TouchableOpacity 
              style={styles.seeAllButton}
              onPress={() => router.push('/search')}
            >
              <Text style={styles.seeAllText}>Vezi toți</Text>
              <ArrowRight size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
          
          {featuredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </View>

        {/* Testimonials */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ce spun clienții noștri</Text>
          <View style={styles.testimonial}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} color={colors.warning} fill={colors.warning} />
              ))}
            </View>
            <Text style={styles.testimonialText}>
  &quot;Am găsit formația perfectă pentru nunta noastră! Procesul de rezervare a fost foarte simplu.&quot;
            </Text>
            <Text style={styles.testimonialAuthor}>- Maria și Alexandru</Text>
          </View>
        </View>

        {/* CTA for Providers */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ești furnizor de servicii?</Text>
          <Text style={styles.ctaSubtitle}>
            Înscrie-ți serviciul și începe să primești rezervări
          </Text>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={() => router.push('/auth/register')}
          >
            <Text style={styles.ctaButtonText}>Înscrie-ți serviciul</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  categoriesList: {
    gap: 12,
    paddingHorizontal: 4,
  },
  testimonial: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 12,
  },
  testimonialText: {
    fontSize: 16,
    color: colors.gray[700],
    lineHeight: 24,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    fontSize: 14,
    color: colors.gray[500],
    fontWeight: '500',
  },
  ctaSection: {
    backgroundColor: colors.primary,
    margin: 16,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaSubtitle: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});