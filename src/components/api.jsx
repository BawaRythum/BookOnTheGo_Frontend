
import axios from 'axios';


const VITE_AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;
const VITE_EVENT_API_URL = import.meta.env.VITE_EVENT_API_URL;


const api = axios.create({
  baseURL: VITE_AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const eventApi = axios.create({
  baseURL: VITE_EVENT_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}` 
  },
})


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

// Event & Booking Endpoints
export const createEvent = async (eventData) => {
  try {
    const response = await eventApi.post('/events/create', eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await eventApi.put(`/events/${eventId}`, eventData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await eventApi.delete(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const bookTicket = async (eventId, numberOfTickets) => {
  try {
    const response = await eventApi.post(`/events/${eventId}/book`, null, {
      params: { numberOfTickets },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getEventById = async (eventId) => {
  try {
    const response = await eventApi.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};