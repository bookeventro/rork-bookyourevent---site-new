import { useState, useEffect } from 'react';

import { User } from '@/types';
import { mockUsers } from '@/data/mockData';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      // Mock user loading - in real app would use AsyncStorage or API
      setUser(null);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Mock login - în realitate ar fi un API call
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        return { success: true };
      }
      return { success: false, error: 'Utilizator inexistent' };
    } catch {
      return { success: false, error: 'Eroare la autentificare' };
    }
  };

  const register = async (email: string, password: string, name: string, type: 'client' | 'provider') => {
    try {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        type,
        createdAt: new Date().toISOString()
      };
      
      setUser(newUser);
      return { success: true };
    } catch {
      return { success: false, error: 'Eroare la înregistrare' };
    }
  };

  const logout = async () => {
    try {
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
};