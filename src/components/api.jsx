
import axios from 'axios';


const VITE_AUTH_SERVICE_PORT = import.meta.env.VITE_AUTH_SERVICE_PORT;
const VITE_EVENT_SERVICE_PORT = import.meta.env.VITE_EVENT_SERVICE_PORT;
const VITE_PAYMENT_SERVICE_PORT = import.meta.env.VITE_PAYMENT_SERVICE_PORT;

const api = axios.create({
  baseURL: `http://localhost:${VITE_AUTH_SERVICE_PORT}/api/v1/auth/`,
  headers: {
    'Content-Type': 'application/json',
  },
});

const eventApi = axios.create({
  baseURL: `http://localhost:${VITE_EVENT_SERVICE_PORT}/api/v1/events/`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}` 
  },
});

const paymentApi = axios.create({
  baseURL: `http://localhost:${VITE_PAYMENT_SERVICE_PORT}/api/payment/`,
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

// Payment APIs
export const processPayment = async (paymentData) => {
  try {
    const response = await paymentApi.post('/payment/process', paymentData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};