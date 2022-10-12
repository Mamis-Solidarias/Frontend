import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://localhost',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});
