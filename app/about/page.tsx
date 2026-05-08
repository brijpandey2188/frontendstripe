'use client';

import { Container, Typography, Box } from '@mui/material';

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>
        About BrijeshAchievement
      </Typography>
      <Box sx={{ color: 'text.secondary' }}>
        <Typography paragraph>
          BrijeshAchievement is a tiered subscription platform for tracking and unlocking
          premium content. Choose Free to get started, Pro for premium content, or Max
          for the full Ultra Premium experience.
        </Typography>
        <Typography paragraph>
          The same navigation is visible to every user — what changes is what each tier
          can access when they click through.
        </Typography>
      </Box>
    </Container>
  );
}
