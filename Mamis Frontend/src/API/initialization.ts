import axios, { AxiosInstance } from 'axios';
import jwt from 'jsonwebtoken';

export const axiosClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
});

export const authAxiosClient = (bearerToken: string) => {
  return axios.create({
    baseURL: 'http://localhost',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + bearerToken
    }
  });
};

const secret = 'Super long key no one will ever find out and definitely not typed by hand';

export const verifyJwt = (token: string) => jwt.verify(token, secret);
