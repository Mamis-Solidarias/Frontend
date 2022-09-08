import axios from 'axios';

export const authAxiosClient = (bearerToken: string) => {
  return axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + bearerToken
    }
  });
};
