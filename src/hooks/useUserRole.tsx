import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'admin' | 'sales' | 'engineer' | 'builder' | 'customer';

export const useUserRole = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserRoles();
  }, []);

  const fetchUserRoles = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setRoles([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (error) throw error;

      setRoles(data?.map(r => r.role as UserRole) || []);
    } catch (error) {
      console.error('Error fetching user roles:', error);
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  const hasRole = (role: UserRole) => roles.includes(role);
  const isAdmin = hasRole('admin');
  const isSales = hasRole('sales');
  const isEngineer = hasRole('engineer');
  const isBuilder = hasRole('builder');
  const isCustomer = hasRole('customer');

  return {
    roles,
    loading,
    hasRole,
    isAdmin,
    isSales,
    isEngineer,
    isBuilder,
    isCustomer,
    refetch: fetchUserRoles
  };
};
