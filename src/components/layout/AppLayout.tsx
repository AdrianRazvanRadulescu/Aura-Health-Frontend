import { Box, Container, Group, Title, Anchor, Button } from '@mantine/core';
import { motion } from 'framer-motion';
import { Outlet, Link } from 'react-router-dom';
import Footer from './Footer';
import { useAuth } from '../../auth/AuthContext'; // Importă useAuth

const AppLayout = () => {
  const { user, logout, isLoading } = useAuth(); // Consumă starea de autentificare

  return (
    <Box>
      <Box component="header" style={{ position: 'sticky', top: 0, zIndex: 10, backdropFilter: 'blur(8px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <Container size="xl" py="md">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Group justify="space-between" align="center">
              <Anchor component={Link} to="/" style={{ textDecoration: 'none' }}>
                <Title order={4} fw={700}>Aura Health</Title>
              </Anchor>
              <Group gap="xl" visibleFrom="sm">
                <Anchor
                  component={Link}
                  to="/services"
                  size="md"
                  styles={(theme) => ({
                    root: {
                      color: theme.colors.gray[7],
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: theme.colors['sage-green'][7],
                      },
                    },
                  })}
                >
                  Servicii
                </Anchor>
                
                <Anchor
                  component={Link}
                  to="/about"
                  size="md"
                  styles={(theme) => ({
                    root: {
                      color: theme.colors.gray[7],
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: theme.colors['sage-green'][7],
                      },
                    },
                  })}
                >
                  Despre noi
                </Anchor>
                
                <Anchor
                  component={Link}
                  to="/contact"
                  size="md"
                  styles={(theme) => ({
                    root: {
                      color: theme.colors.gray[7],
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: theme.colors['sage-green'][7],
                      },
                    },
                  })}
                >
                  Contact
                </Anchor>
              </Group>
              <Group gap="xs">
                {user ? (
                  <>
                    <Button component={Link} to="/dashboard" variant="subtle">Dashboard</Button>
                    <Button onClick={() => logout()} loading={isLoading}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Button component={Link} to="/login" variant="subtle">Login</Button>
                    <Button component={Link} to="/register">Înregistrare</Button>
                  </>
                )}
              </Group>
            </Group>
          </motion.div>
        </Container>
      </Box>

      <main>
        <Outlet />
      </main>

      <Footer />
    </Box>
  );
};

export default AppLayout;