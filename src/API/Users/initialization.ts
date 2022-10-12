import axios, { AxiosInstance } from 'axios';

export const authAxiosClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
