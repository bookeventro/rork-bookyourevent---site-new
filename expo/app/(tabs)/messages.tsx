import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MessageCircle } from 'lucide-react-native';
import colors from '@/constants/colors';
import { useAuthContext } from '@/contexts/AuthContext';

interface Message {
  id: string;
  providerName: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    providerName: 'Formația Harmony',
    lastMessage: 'Mulțumim pentru cerere! Vă vom răspunde în curând.',
    timestamp: '2 ore',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100'
  },
  {
    id: '2',
    providerName: 'DJ Alex Events',
    lastMessage: 'Avem disponibilitate pentru data solicitată.',
    timestamp: '1 zi',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1571266028243-d220c9c3b2d2?w=100'
  }
];

export default function MessagesScreen() {
  const { isAuthenticated } = useAuthContext();
  const insets = useSafeAreaInsets();

  if (!isAuthenticated) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.emptyState}>
          <MessageCircle size={64} color={colors.gray[400]} />
          <Text style={styles.emptyTitle}>Conectează-te pentru mesaje</Text>
          <Text style={styles.emptySubtitle}>
            Autentifică-te pentru a vedea conversațiile cu furnizorii
          </Text>
        </View>
      </View>
    );
  }

  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity style={styles.messageCard}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.providerName}>{item.providerName}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        <Text style={[styles.lastMessage, item.unread && styles.unreadMessage]}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mesaje</Text>
      </View>
      
      <FlatList
        data={mockMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 24,
  },
  messagesList: {
    flex: 1,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },
  timestamp: {
    fontSize: 12,
    color: colors.gray[500],
  },
  lastMessage: {
    fontSize: 14,
    color: colors.gray[600],
    lineHeight: 20,
  },
  unreadMessage: {
    fontWeight: '500',
    color: colors.black,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
});