'use client';

import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Link from 'next/link';
import { useState, MouseEvent } from 'react';
import { useAuth } from './AuthProvider';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Premium', href: '/premium' },
  { label: 'Ultra Premium', href: '/ultra-premium' },
];

export default function Navigation() {
  const { user, logout } = useAuth();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleOpen = (e: MouseEvent<HTMLElement>) => setAnchor(e.currentTarget);
  const handleClose = () => setAnchor(null);

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar sx={{ gap: 2 }}>
        <Box
          component={Link}
          href="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          <EmojiEventsIcon sx={{ color: 'secondary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            BrijeshAchievement
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, ml: 3 }}>
          {NAV_LINKS.map((l) => (
            <Button
              key={l.href}
              component={Link}
              href={l.href}
              color="inherit"
              sx={{ fontWeight: 500 }}
            >
              {l.label}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {user ? (
          <>
            <Typography variant="body2" sx={{ mr: 1, opacity: 0.85 }}>
              {user.tier.toUpperCase()}
            </Typography>
            <IconButton onClick={handleOpen} size="small">
              <Avatar sx={{ bgcolor: 'secondary.main', color: 'primary.main', width: 32, height: 32 }}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={handleClose}>
              <MenuItem disabled>{user.email}</MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  logout();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button component={Link} href="/login" color="inherit">
              Login
            </Button>
            <Button
              component={Link}
              href="/register"
              variant="contained"
              color="secondary"
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
