import { Title, Anchor, Box, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import LoginForm from '../features/authentication/components/LoginForm';
import AuthLayout from '../components/layout/AuthLayout';

const LoginPage = () => {
  return (
    <AuthLayout>
      <Title order={2} ta="left" mb="xs">
        Welcome Back
      </Title>
      <Text c="dimmed" mb="xl">
        Please sign in to access your health dashboard.
      </Text>
      <LoginForm />
      <Box ta="center" mt="xl">
        <Anchor component={Link} to="/" c="sage-green">
          Back to Home
        </Anchor>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;