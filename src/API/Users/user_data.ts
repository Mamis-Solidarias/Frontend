import Role from 'src/types/users/Role';
import User, { UserNoId, UsersHttp } from 'src/types/users/User';
import { axiosClient } from './initialization';

export const getUsers = async (page: number, pageSize: number): Promise<{ data: UsersHttp }> => {
  const query = '?page=' + page + '&pageSize=' + pageSize;

  return axiosClient.get('/users/' + query);
};

export const getUser = async (id: string): Promise<{ data: { user: User } }> => {
  return axiosClient.get('/users/' + id.toString());
};

export const reactivateUser = async (id: number) => {
  return axiosClient.post('/users/' + id.toString());
};

export const createUser = async (data: UserNoId) => {
  return axiosClient.post('/users/', data);
};

export const updateUser = async (
  id: string,
  data: { email: string | null; name?: string | null; phone?: string | null }
) => {
  return axiosClient.patch('/users/' + id.toString(), data);
};

export const deleteUser = async (id: number) => {
  return axiosClient.delete('/users/' + id.toString());
};

export const updateUserPassword = async (id: string, passwordData: { oldPassword: string; newPassword: string }) => {
  return axiosClient.put('/users/' + id + '/password', passwordData);
};

export const updateUserRole = async (id: number, roles: Role[]) => {
  return axiosClient.put('/users/' + id + '/roles', { roles: roles });
};

export const getUserRoles = async (id: number) => {
  return axiosClient.get('/users/' + id + '/roles');
};

export const getRoles = async () => {
  return axiosClient.get('/users/roles');
};
