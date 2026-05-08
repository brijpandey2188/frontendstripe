'use client';

import { Box, Container, Typography, Button, Grid, Card, CardContent, Chip } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Link from 'next/link';
import { useAuth } from '../components/AuthProvider';

type TierCard = {
  name: 'Free' | 'Pro' | 'Max';
  price: string;
  icon: React.ReactNode;
  perks: string[];
  cta: { label: string; href: string } | null;
  highlight?: boolean;
};

export default function HomePage() {
  const { user } = useAuth();
  const isLoggedIn = !!user;

  const tiers: TierCard[] = [
    {
      name: 'Free',
      price: '$0',
      icon: <StarIcon color="primary" />,
      perks: ['Home access', 'About page'],
      cta: isLoggedIn ? null : { label: 'Sign up', href: '/register' },
    },
    {
      name: 'Pro',
      price: '$9.99 / mo',
      icon: <EmojiEventsIcon sx={{ color: 'secondary.main' }} />,
      perks: ['Everything in Free', 'Premium content'],
      cta: { label: 'Get Pro', href: '/subscribe?plan=pro' },
      highlight: true,
    },
    {
      name: 'Max',
      price: '$19.99 / mo',
      icon: <WorkspacePremiumIcon sx={{ color: 'secondary.main' }} />,
      perks: ['Everything in Pro', 'Ultra Premium content'],
      cta: { label: 'Get Max', href: '/subscribe?plan=max' },
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" gutterBottom>
          BrijeshAchievement
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 720, mx: 'auto' }}>
          Unlock premium achievements with a subscription tier that fits you.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {tiers.map((t) => (
          <Grid item xs={12} md={4} key={t.name}>
            <Card
              elevation={t.highlight ? 6 : 1}
              sx={{
                height: '100%',
                borderTop: t.highlight ? 4 : 0,
                borderColor: 'secondary.main',
              }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {t.icon}
                  <Typography variant="h5">{t.name}</Typography>
                  {t.highlight && (
                    <Chip
                      label="Popular"
                      size="small"
                      color="secondary"
                      sx={{ ml: 'auto' }}
                    />
                  )}
                </Box>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  {t.price}
                </Typography>
                <Box component="ul" sx={{ pl: 2.5, mb: 3, color: 'text.secondary' }}>
                  {t.perks.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                {t.cta && (
                  <Button
                    component={Link}
                    href={t.cta.href}
                    variant={t.highlight ? 'contained' : 'outlined'}
                    color={t.highlight ? 'secondary' : 'primary'}
                    fullWidth
                  >
                    {t.cta.label}
                  </Button>
                )}
                {!t.cta && t.name === 'Free' && isLoggedIn && user?.tier === 'free' && (
                  <Chip label="Current plan" color="primary" variant="outlined" />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
