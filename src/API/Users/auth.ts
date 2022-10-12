import { axiosClient } from './initialization';

export const loginUser = async (email: string, password: string) => {
  const data = { email, password };

  return axiosClient.post('login', data);
};

export const logoutUser = async () => {
  return axiosClient.post('logout');
};
