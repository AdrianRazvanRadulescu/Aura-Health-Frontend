import { Box, Grid, Title, Text, useMantineTheme } from '@mantine/core';
import { motion } from 'framer-motion';
import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const theme = useMantineTheme();

  return (
    <Grid gutter={0} style={{ minHeight: '100vh' }}>
      {/* Coloana de Branding și Inspirație */}
      <Grid.Col
        span={{ base: 0, md: 5, lg: 6 }}
        style={{
          backgroundColor: theme.colors['sage-green'][0],
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: '100vh', // ADAUGAT: Asigură umplerea pe înălțime
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Box style={{ position: 'relative', zIndex: 2, padding: '10%' }}>
            <Title order={4} c="sage-green.9" mb="sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Aura Health
            </Title>
            <Title order={1} size={60} c="deep-forest.8" style={{ lineHeight: 1.2, fontFamily: 'Poppins, sans-serif' }}>
              The Natural Evolution of Care.
            </Title>
            <Text c="deep-forest.7" size="lg" mt="md" style={{ maxWidth: 400 }}>
              Blending advanced technology with a human-centric approach.
            </Text>
          </Box>
        </motion.div>

        {/* Forme decorative animate */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.5 }}
          style={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 300,
            height: 300,
            backgroundColor: theme.colors['sage-green'][2],
            borderRadius: '50%',
            filter: 'blur(40px)',
            opacity: 0.5,
          }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.7 }}
          style={{
            position: 'absolute',
            top: -150,
            left: -50,
            width: 400,
            height: 400,
            backgroundColor: theme.colors['sage-green'][1],
            borderRadius: '50%',
            filter: 'blur(50px)',
            opacity: 0.6,
          }}
        />
      </Grid.Col>

      {/* Coloana cu Formularul */}
      <Grid.Col
        span={{ base: 12, md: 7, lg: 6 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'var(--mantine-spacing-xl)',
          backgroundColor: '#FFFFFF',
          minHeight: '100vh', // ADAUGAT: Forțează coloana să ocupe toată înălțimea
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ width: '100%', maxWidth: 450 }}
        >
          {children}
        </motion.div>
      </Grid.Col>
    </Grid>
  );
};

export default AuthLayout;