import { Box, Button, TextInput, PasswordInput, Stack } from '@mantine/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../../auth/AuthContext';
import { RegisterCredentials } from '../types';

const RegisterForm = () => {
  const { register: registerUser, isLoading } = useAuth(); // Folosim contextul
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterCredentials>();

  const onSubmit: SubmitHandler<RegisterCredentials> = (data) => {
    registerUser(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap="md">
        <TextInput
          required
          label="Nume"
          placeholder="Numele tău"
          autoComplete="name"
          {...register("name", { required: "Numele este obligatoriu" })}
          error={errors.name?.message}
        />
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
          autoComplete="new-password"
          {...register("password", { required: "Parola este obligatorie" })}
          error={errors.password?.message}
        />
        <PasswordInput
          required
          label="Confirmă Parola"
          placeholder="Confirmă parola"
          autoComplete="new-password"
          {...register("password_confirmation", { required: "Confirmarea parolei este obligatorie" })}
          error={errors.password_confirmation?.message}
        />
        <Button
          type="submit"
          fullWidth
          size="lg"
          loading={isLoading}
        >
          Înregistrare
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterForm;