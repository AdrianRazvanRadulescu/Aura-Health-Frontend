import axios from 'axios';
import { AuthResponse, LoginCredentials } from '../types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
  },
});

export const loginAPI = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  await apiClient.get('/sanctum/csrf-cookie');
  const response = await apiClient.post('/login', credentials);
  return response.data;
};