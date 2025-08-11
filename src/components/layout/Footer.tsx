import { Box, Container, Grid, Title, Text, Anchor, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { LinkedinLogo, TwitterLogo, FacebookLogo } from '@phosphor-icons/react';

const Footer = () => {
  return (
    <Box component="footer" py={80} style={{ backgroundColor: 'var(--mantine-color-sage-green-0)' }}>
      <Container size="xl">
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Title order={4} mb="md">Aura Health</Title>
            <Text c="dimmed" pr="lg">
              Reimaginăm sănătatea printr-o abordare modernă, combinând tehnologia de vârf cu grija umană.
            </Text>
            <Group gap="xs" mt="md">
                <Anchor href="#" c="dimmed"><LinkedinLogo size={24} /></Anchor>
                <Anchor href="#" c="dimmed"><TwitterLogo size={24} /></Anchor>
                <Anchor href="#" c="dimmed"><FacebookLogo size={24} /></Anchor>
            </Group>
          </Grid.Col>

          <Grid.Col span={{ base: 6, md: 2, offsetMd: 1 }}>
            <Title order={5} mb="sm">Companie</Title>
            <Anchor component={Link} to="/about" c="dimmed" display="block" mb={4}>Despre noi</Anchor>
            <Anchor component={Link} to="/contact" c="dimmed" display="block" mb={4}>Contact</Anchor>
            <Anchor href="#" c="dimmed" display="block" mb={4}>Cariere</Anchor>
          </Grid.Col>

          <Grid.Col span={{ base: 6, md: 2 }}>
            <Title order={5} mb="sm">Servicii</Title>
            <Anchor component={Link} to="/services" c="dimmed" display="block" mb={4}>Consultații</Anchor>
            <Anchor component={Link} to="/services" c="dimmed" display="block" mb={4}>Diagnostic AI</Anchor>
            <Anchor component={Link} to="/services" c="dimmed" display="block" mb={4}>Monitorizare</Anchor>
          </Grid.Col>

           <Grid.Col span={{ base: 12, md: 3 }}>
            <Title order={5} mb="sm">Legal</Title>
            <Anchor href="#" c="dimmed" display="block" mb={4}>Termeni și Condiții</Anchor>
            <Anchor href="#" c="dimmed" display="block" mb={4}>Politica de Confidențialitate</Anchor>
          </Grid.Col>
        </Grid>

        <Text c="dimmed" ta="center" mt={80} pt="xl" style={{ borderTop: '1px solid var(--mantine-color-sage-green-2)' }}>
          &copy; {new Date().getFullYear()} Aura Health. Inspired by nature. Perfected by technology.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;