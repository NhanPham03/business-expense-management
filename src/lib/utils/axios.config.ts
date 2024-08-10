import axios from 'axios';

export const public_API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
