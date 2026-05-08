'use client';

import { ReactNode, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import { Tier, tierAtLeast } from '../types';

interface Props {
  requiredTier: Tier;
  children: ReactNode;
}

export default function ProtectedRoute({ requiredTier, children }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/login?next=${encodeURIComponent(pathname || '/')}`);
      return;
    }
    if (!tierAtLeast(user.tier, requiredTier)) {
      router.replace(`/subscribe?plan=${requiredTier}`);
    }
  }, [user, loading, requiredTier, pathname, router]);

  if (loading || !user || !tierAtLeast(user.tier, requiredTier)) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
