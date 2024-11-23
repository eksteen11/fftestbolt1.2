import axios from 'axios';
import { User } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL;

interface AuthResponse {
  user: User;
  token: string;
}

export const registerUser = async (userData: {
  email: string;
  password: string;
  name: string;
}): Promise<User> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, userData);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    }
    throw new Error('Invalid response format');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
    throw new Error('Registration failed');
  }
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<User> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, credentials);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      return response.data.user;
    }
    throw new Error('Invalid response format');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw new Error('Login failed');
  }
};

export const checkAuth = async (): Promise<User | null> => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const response = await axios.get<{ user: User }>(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.user;
  } catch (error) {
    localStorage.removeItem('token');
    return null;
  }
};