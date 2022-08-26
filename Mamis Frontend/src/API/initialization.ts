import axios, { AxiosInstance } from 'axios';

export const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

export const secret = 'Super long key no one will ever find out and definitely not typed by hand';
