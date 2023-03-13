import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + 'api',
  headers: {
    'Content-Type': 'application/json'
  }
});
