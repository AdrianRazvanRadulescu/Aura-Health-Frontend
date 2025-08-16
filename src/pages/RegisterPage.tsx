import { Box, Container, Title, Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import RegisterForm from '../features/authentication/components/RegisterForm';

const RegisterPage = () => {
  return (
    <Box style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'var(--mantine-color-sage-green-0)',
      padding: 'var(--mantine-spacing-xl)',
    }}>
      <Container style={{
        backgroundColor: 'white',
        borderRadius: 'var(--mantine-radius-md)',
        boxShadow: 'var(--mantine-shadow-md)',
        padding: 'var(--mantine-spacing-xl)',
        width: '100%',
        maxWidth: 480,
      }}>
        <Title order={2} ta="center" mb="lg">
          Creează un Cont Nou
        </Title>
        <RegisterForm />
        <Text ta="center" mt="xl">
          Ai deja un cont?{' '}
          <Anchor component={Link} to="/login" c="sage-green">
            Autentifică-te
          </Anchor>
        </Text>
      </Container>
    </Box>
  );
};

export default RegisterPage;