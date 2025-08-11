import { Box, Container, Title, Anchor} from '@mantine/core';
import { Link } from 'react-router-dom';
import LoginForm from '../features/authentication/components/LoginForm';

const LoginPage = () => {
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
          Sign In to Your Account
        </Title>
        <LoginForm />
        <Box ta="center" mt="xl">
          <Anchor component={Link} to="/" c="sage-green">
            Back to Home
          </Anchor>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage;