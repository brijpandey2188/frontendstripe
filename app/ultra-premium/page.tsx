'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import ProtectedRoute from '../../components/ProtectedRoute';
import { api, getApiErrorMessage } from '../../lib/api';
import { ContentResponse } from '../../types';

function UltraPremiumInner() {
  const [data, setData] = useState<ContentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<ContentResponse>('/content/ultra-premium')
      .then(({ data }) => setData(data))
      .catch((err) => setError(getApiErrorMessage(err, 'Failed to load')));
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {error && <Alert severity="error">{error}</Alert>}
      {data && (
        <Card sx={{ borderTop: 4, borderColor: 'secondary.main' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {data.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              {data.body}
            </Typography>
            <List>
              {data.items.map((it) => (
                <ListItem key={it.id} divider>
                  <ListItemText primary={it.name} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

export default function UltraPremiumPage() {
  return (
    <ProtectedRoute requiredTier="max">
      <UltraPremiumInner />
    </ProtectedRoute>
  );
}
