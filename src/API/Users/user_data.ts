import Role from 'src/types/Role';
import User, { UsersHttp } from 'src/types/User';
import { authAxiosClient } from './initialization';

export const getUsers = async (loginData: any, page: number, pageSize: number): Promise<{ data: UsersHttp }> => {
  const query = '?page=' + page + '&pageSize=' + pageSize;

  return authAxiosClient(loginData).get('users' + query);
};

export const getUser = async (loginData: any, id: string): Promise<{ data: User }> => {
  return authAxiosClient(loginData).get('users/' + id);
};

export const reactivateUser = async (loginData: any, id: number) => {
  return authAxiosClient(loginData).post('users/' + id);
};

export const createUser = async (loginData: any, data: User) => {
  return authAxiosClient(loginData).post('users', data);
};

export const updateUser = async (
  loginData: any,
  id: string,
  data: { email: string | null; name?: string | null; phone?: string | null }
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

export const updateUserRole = async (loginData: any, id: number, roles: Role[]) => {
  return authAxiosClient(loginData).put('users/' + id + '/roles', { roles: roles });
};

export const getUserRoles = async (loginData: any, id: number) => {
  return authAxiosClient(loginData).get('users/' + id + '/roles');
};

export const getRoles = async (loginData: any) => {
  return authAxiosClient(loginData).get('users/roles');
};
