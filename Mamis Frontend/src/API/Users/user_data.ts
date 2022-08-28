import { authAxiosClient } from '../initialization';

export const getUsers = async (loginData: any, page: number, pageSize: number) => {
  const query = '?page=' + page + '&pageSize=' + pageSize;

  return authAxiosClient(loginData).get('users' + query);
};
