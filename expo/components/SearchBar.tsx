import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Search, MapPin, Calendar } from 'lucide-react-native';
import colors from '@/constants/colors';

interface SearchBarProps {
  onSearch: (query: string, location: string, date: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    onSearch(query, location, date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <View style={styles.inputContainer}>
          <Search size={20} color={colors.gray[400]} />
          <TextInput
            style={styles.input}
            placeholder="Ce serviciu cauți?"
            value={query}
            onChangeText={setQuery}
            placeholderTextColor={colors.gray[400]}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <MapPin size={20} color={colors.gray[400]} />
          <TextInput
            style={styles.input}
            placeholder="Oraș"
            value={location}
            onChangeText={setLocation}
            placeholderTextColor={colors.gray[400]}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Calendar size={20} color={colors.gray[400]} />
          <TextInput
            style={styles.input}
            placeholder="Data evenimentului"
            value={date}
            onChangeText={setDate}
            placeholderTextColor={colors.gray[400]}
          />
        </View>
      </View>
      
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Caută</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchRow: {
    gap: 12,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[50],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  searchButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});