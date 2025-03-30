import axios from 'axios';

const VITE_NOTIFICATION_API_URL = import.meta.env.VITE_NOTIFICATION_API_URL;

const notifyApi = axios.create({
  baseURL: VITE_NOTIFICATION_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to notify new event creation
export const notifyNewEvent = async (eventData) => {
  try {
    const response = await notifyApi.post('/event-created', eventData);
    return response.data;
  } catch (error) {
    throw new Error('Error notifying new event: ' + error.message);
  }
};

// Function to notify event updates
export const notifyEventUpdated = async (eventData) => {
  try {
    const response = await notifyApi.post('/event-updated', eventData);
    return response.data;
  } catch (error) {
    throw new Error('Error notifying event update: ' + error.message);
  }
};

// Function to subscribe to event updates
export const subscribeToUpdates = async (email, token) => {
  try {
    const response = await notifyApi.get(`/subscribe?email=${email}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error subscribing to updates: ' + error.message);
  }
};

// Function to unsubscribe from event updates
export const unsubscribeFromUpdates = async (email, token) => {
  try {
    const response = await notifyApi.get(`/unsubscribe?email=${email}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error unsubscribing from updates: ' + error.message);
  }
};

