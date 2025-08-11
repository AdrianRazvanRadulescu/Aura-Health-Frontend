import { Box, Button, TextInput, PasswordInput, Stack, Alert, Anchor } from '@mantine/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IconAlertCircle } from '@tabler/icons-react';

import { useLogin } from '../hooks/useLogin';
import { LoginCredentials } from '../types';

const LoginForm = () => {
  const { login, isLoading, error } = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();

  const onSubmit: SubmitHandler<LoginCredentials> = (data) => {
    login(data); 
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
         <Alert 
           variant="light" 
           color="red" 
           title="Eroare la autentificare" 
           icon={<IconAlertCircle size={16} />} 
           mb="md"
         >
            {error.response?.data?.message || 'Emailul sau parola sunt incorecte.'}
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
          label="Password"
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

        <Anchor href="#" size="sm" c="dimmed" ta="center">
          Ai uitat parola?
        </Anchor>
      </Stack>
    </Box>
  );
};

export default LoginForm;