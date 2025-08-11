import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../api/authAPI';
import { AuthResponse, LoginCredentials, ApiError } from '../types';
import { AxiosError } from 'axios';

export const useLogin = () => {
  const navigate = useNavigate();

  const { 
    mutate: login,
    isPending: isLoading,
    error 
  } = useMutation<
    AuthResponse,
    AxiosError<ApiError>,
    LoginCredentials
  >({
    mutationFn: loginAPI,
    onSuccess: (data) => {
      console.log('Login successful:', data);
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Login failed:', error.response?.data.message);
    },
  });

  return { login, isLoading, error };
};