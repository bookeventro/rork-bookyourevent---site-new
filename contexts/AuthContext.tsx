import createContextHook from '@nkzw/create-context-hook';
import { useAuth } from '@/hooks/useAuth';

export const [AuthProvider, useAuthContext] = createContextHook(() => {
  return useAuth();
});