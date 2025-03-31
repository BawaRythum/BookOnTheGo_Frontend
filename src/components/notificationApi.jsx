import axios from 'axios';

const VITE_NOTIFICATION_SERVICE_PORT = 8084;

const notifyApi = axios.create({
  baseURL: `http://localhost:${VITE_NOTIFICATION_SERVICE_PORT}/notify`,
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

// Updated function to subscribe (without token)
export const subscribeToUpdates = async (email) => {
  try {
    const response = await notifyApi.get(`/subscribe?email=${encodeURIComponent(email)}`);
    return response.data;
  } catch (error) {
    throw new Error('Error subscribing to updates: ' + error.message);
  }
};

// Updated function to unsubscribe (without token)
export const unsubscribeFromUpdates = async (email) => {
  try {
    const response = await notifyApi.get(`/unsubscribe?email=${encodeURIComponent(email)}`);
    return response.data;
  } catch (error) {
    throw new Error('Error unsubscribing from updates: ' + error.message);
  }
};
