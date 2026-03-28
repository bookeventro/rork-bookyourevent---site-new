import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import { SearchBar } from '@/components/SearchBar';
import { ProviderCard } from '@/components/ProviderCard';
import { mockProviders } from '@/data/mockData';
import { Provider } from '@/types';

export default function SearchScreen() {
  const [providers, setProviders] = useState<Provider[]>(mockProviders);
  const insets = useSafeAreaInsets();

  const handleSearch = (query: string, location: string, date: string) => {
    // Mock search logic
    let filtered = mockProviders;
    
    if (query) {
      filtered = filtered.filter(p => 
        p.businessName.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    setProviders(filtered);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <SearchBar onSearch={handleSearch} />
      
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>
          {providers.length} furnizori găsiți
        </Text>
        
        <FlatList
          data={providers}
          renderItem={({ item }) => <ProviderCard provider={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.providersList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 16,
  },
  providersList: {
    paddingBottom: 20,
  },
});