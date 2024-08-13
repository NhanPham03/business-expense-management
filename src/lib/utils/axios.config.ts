import axios from 'axios';

export const API_URI = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
});
