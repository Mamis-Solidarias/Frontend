import axios, { AxiosInstance } from 'axios';

export const authAxiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + 'api',
  headers: {
    'Content-Type': 'application/json'
  }
});
