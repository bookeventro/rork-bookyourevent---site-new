import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import colors from '@/constants/colors';
import { ProviderCard } from '@/components/ProviderCard';
import { mockProviders, categories } from '@/data/mockData';
import { Provider, ServiceCategory } from '@/types';

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: ServiceCategory }>();
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    if (category) {
      const filtered = mockProviders.filter(p => p.category === category);
      setProviders(filtered);
    }
  }, [category]);

  const categoryInfo = categories.find(c => c.id === category);
  const categoryName = categoryInfo?.name || 'Categoria';

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: categoryName,
          headerShown: true 
        }} 
      />
      
      <View style={styles.content}>
        <Text style={styles.resultsTitle}>
          {providers.length} furnizori în categoria {categoryName}
        </Text>
        
        <FlatList
          data={providers}
          renderItem={({ item }) => <ProviderCard provider={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.providersList}
        />
      </View>
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
    paddingHorizontal: 16,
    paddingTop: 16,
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