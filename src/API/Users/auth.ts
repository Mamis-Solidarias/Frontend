import { authAxiosClient } from './initialization';

export const loginUser = async (email: string, password: string) => {
  const data = { email, password };

  return authAxiosClient.post('login', data);
};

export const logoutUser = async () => {
  return authAxiosClient.post('logout');
};
