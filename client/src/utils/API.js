// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
// const API_URL = `${BACKEND_URL}/draft`;


import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.VITE_SERVER_URL || 'http://localhost:5000/draft',
  withCredentials: true,
});

export default api;