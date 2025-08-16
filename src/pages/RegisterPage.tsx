import { Title, Anchor, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import RegisterForm from '../features/authentication/components/RegisterForm';
import AuthLayout from '../components/layout/AuthLayout';

const RegisterPage = () => {
  return (
    <AuthLayout>
      <Title order={2} ta="left" mb="xs">
        Create Your Account
      </Title>
      <Text c="dimmed" mb="xl">
        Start your journey towards intelligent healthcare today.
      </Text>
      <RegisterForm />
      <Text ta="center" mt="xl">
        Already have an account?{' '}
        <Anchor component={Link} to="/login" c="sage-green">
          Sign In
        </Anchor>
      </Text>
    </AuthLayout>
  );
};

export default RegisterPage;