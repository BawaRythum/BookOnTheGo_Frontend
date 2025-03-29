
import axios from 'axios';


const VITE_AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;

const api = axios.create({
  baseURL: VITE_AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = async (userData) => {
  try {
    const response = await api.post('auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyOtp = async (otpData) => {
  try {
    const response = await api.post('otp/verify', otpData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      'OTP verification failed. Please try again.'
    );
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.response?.data?.error ||
      'Login failed. Please try again.'
    );
  }
};