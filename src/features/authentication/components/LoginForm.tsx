import { Box, Button, TextInput, PasswordInput, Stack, Alert, Anchor, Text } from '@mantine/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../../auth/AuthContext';
import { LoginCredentials } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginForm = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();

  const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
    try {
      setError(null);
      await login(data);
      navigate('/dashboard');
    } catch (err) {
      setError('Emailul sau parola sunt incorecte.');
      console.error(err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
         <Alert variant="light" color="red" title="Eroare la autentificare" mb="md">
            {error}
         </Alert>
      )}

      <Stack gap="md">
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          autoComplete="email"
          {...register("email", { required: "Adresa de email este obligatorie" })}
          error={errors.email?.message}
        />
        <PasswordInput
          required
          label="Parola"
          placeholder="Parola ta"
          autoComplete="current-password"
          {...register("password", { required: "Parola este obligatorie" })}
          error={errors.password?.message}
        />
        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isLoading}
        >
          Login
        </Button>

        <Text ta="center" mt="md">
          Nu ai cont?{' '}
            <Anchor component={Link} to="/register" c="sage-green">
                Înregistrează-te
            </Anchor>
        </Text>
      </Stack>
    </Box>
  );
};

export default LoginForm;