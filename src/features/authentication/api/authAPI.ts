import axios from 'axios';
import { User, LoginCredentials, RegisterCredentials } from '../types';


axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

export const apiClient = axios.create({
  headers: {
    'Accept': 'application/json',
  },
});

const getCsrfCookie = async () => {
    await apiClient.get('/sanctum/csrf-cookie');
};

export const registerAPI = async (credentials: RegisterCredentials): Promise<User> => {
  await getCsrfCookie();
  const response = await apiClient.post('/api/register', credentials);
  return response.data;
};

export const loginAPI = async (credentials: LoginCredentials): Promise<User> => {
  await getCsrfCookie();
  const response = await apiClient.post('/api/login', credentials);
  return response.data;
};

export const logoutAPI = async (): Promise<void> => {
  await apiClient.post('/api/logout');
};

export const getUserAPI = async (): Promise<User | null> => {
    try {
        const response = await apiClient.get('/api/user');
        return response.data;
    } catch (error) {
        return null;
    }
};