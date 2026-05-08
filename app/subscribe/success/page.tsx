'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Alert,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import Link from 'next/link';
import { useAuth } from '../../../components/AuthProvider';

export default function SubscribeSuccessPage() {
  const { refresh, user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const tick = async (attempt: number) => {
      const u = await refresh();
      if (cancelled) return;
      // Stripe webhook may take a moment; retry a few times if tier hasn't updated yet.
      if (u && u.tier === 'free' && attempt < 5) {
        setTimeout(() => tick(attempt + 1), 1500);
        return;
      }
      setLoading(false);
    };
    tick(0);
    return () => {
      cancelled = true;
    };
  }, [refresh]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Card>
        <CardContent>
          <Alert severity="success" sx={{ mb: 2 }}>
            Payment successful! Your subscription is{' '}
            <strong>{user?.tier.toUpperCase()}</strong>.
          </Alert>
          <Typography variant="h5" gutterBottom>
            Welcome to {user?.tier === 'max' ? 'Ultra Premium' : 'Premium'}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Your access has been unlocked. Head over to your new content.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={Link} href="/premium" variant="contained" color="primary">
              Go to Premium
            </Button>
            {user?.tier === 'max' && (
              <Button component={Link} href="/ultra-premium" variant="contained" color="secondary">
                Go to Ultra Premium
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
