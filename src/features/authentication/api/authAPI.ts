import axios from 'axios';
import { User, LoginCredentials, RegisterCredentials } from '../types';

// Setări globale pentru Axios
axios.defaults.withCredentials = true; // Permite trimiterea cookie-urilor
axios.defaults.withXSRFToken = true; // NOU: Permite trimiterea automată a token-ului CSRF
axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

const apiClient = axios.create({
  headers: {
    'Accept': 'application/json',
  },
});

const getCsrfCookie = async () => {
    // Acum URL-ul este relativ la baseURL
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