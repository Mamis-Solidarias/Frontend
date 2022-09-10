import { authAxiosClient } from './initialization';

export const getUsers = async (loginData: any, page: number, pageSize: number) => {
  const query = '?page=' + page + '&pageSize=' + pageSize;

  return authAxiosClient(loginData).get('users' + query);
};

export const getUser = async (loginData: any, id: string) => {
  return authAxiosClient(loginData).get('users/' + id);
};

export const reactivateUser = async (loginData: any, id: number) => {
  return authAxiosClient(loginData).post('users/' + id);
};

export const createUser = async (
  loginData: any,
  data: { email: string; name: string; phone: string; password: string }
) => {
  return authAxiosClient(loginData).post('users', data);
};

export const updateUser = async (
  loginData: any,
  id: string,
  data: { email?: string; name?: string; phone?: string }
) => {
  return authAxiosClient(loginData).patch('users/' + id, data);
};

export const deleteUser = async (loginData: any, id: number) => {
  return authAxiosClient(loginData).delete('users/' + id);
};

export const updateUserPassword = async (
  loginData: any,
  id: string,
  passwordData: { oldPassword: string; newPassword: string }
) => {
  return authAxiosClient(loginData).put('users/' + id + '/password', passwordData);
};

export const updateUserRole = async (
  loginData: any,
  id: number,
  roles: { service: string; canWrite: boolean; canRead: boolean }[]
) => {
  return authAxiosClient(loginData).put('users/' + id + '/roles', { roles: roles });
};

export const getUserRoles = async (loginData: any, id: number) => {
  return authAxiosClient(loginData).get('users/' + id + '/roles');
};

export const getRoles = async (loginData: any) => {
  return authAxiosClient(loginData).get('users/roles');
};
