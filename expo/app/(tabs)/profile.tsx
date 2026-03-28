import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { 
  User, 
  Settings, 
  Heart, 
  Calendar, 
  HelpCircle, 
  LogOut,
  ChevronRight 
} from 'lucide-react-native';
import colors from '@/constants/colors';
import { useAuthContext } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const { user, isAuthenticated, logout } = useAuthContext();
  const insets = useSafeAreaInsets();

  if (!isAuthenticated) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.authPrompt}>
          <User size={64} color={colors.gray[400]} />
          <Text style={styles.authTitle}>Conectează-te</Text>
          <Text style={styles.authSubtitle}>
            Creează un cont pentru a accesa toate funcționalitățile
          </Text>
          
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.loginButtonText}>Conectează-te</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.registerButton}
            onPress={() => router.push('/auth/register')}
          >
            <Text style={styles.registerButtonText}>Creează cont</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const menuItems = [
    {
      icon: Settings,
      title: 'Setări cont',
      onPress: () => console.log('Settings'),
    },
    {
      icon: Heart,
      title: 'Furnizori salvați',
      onPress: () => console.log('Favorites'),
    },
    {
      icon: Calendar,
      title: 'Rezervările mele',
      onPress: () => console.log('Bookings'),
    },
    {
      icon: HelpCircle,
      title: 'Ajutor & Suport',
      onPress: () => console.log('Help'),
    },
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil</Text>
        </View>

        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <User size={32} color={colors.primary} />
          </View>
          <Text style={styles.userName}>{user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
          <Text style={styles.userType}>
            {user?.type === 'provider' ? 'Furnizor' : 'Client'}
          </Text>
        </View>

        {user?.type === 'provider' && (
          <TouchableOpacity 
            style={styles.dashboardButton}
            onPress={() => console.log('Provider Dashboard')}
          >
            <Text style={styles.dashboardButtonText}>Dashboard Furnizor</Text>
          </TouchableOpacity>
        )}

        <View style={styles.menu}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.title}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <item.icon size={24} color={colors.gray[600]} />
              <Text style={styles.menuItemText}>{item.title}</Text>
              <ChevronRight size={20} color={colors.gray[400]} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={24} color={colors.error} />
          <Text style={styles.logoutText}>Deconectează-te</Text>
        </TouchableOpacity>
      </ScrollView>
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
  authPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 16,
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 16,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    minWidth: 200,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  registerButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 200,
  },
  registerButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  userInfo: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: colors.white,
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 4,
  },
  userType: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  dashboardButton: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  dashboardButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  menu: {
    backgroundColor: colors.white,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    color: colors.error,
    fontWeight: '500',
  },
});