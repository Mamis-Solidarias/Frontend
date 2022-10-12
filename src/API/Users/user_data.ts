import Role from 'src/types/Role';
import User, { UserNoId, UsersHttp } from 'src/types/User';
import { axiosClient } from './initialization';

export const getUsers = async (page: number, pageSize: number): Promise<{ data: UsersHttp }> => {
  const query = '?page=' + page + '&pageSize=' + pageSize;

  return axiosClient.get('/api/users/' + query);
};

export const getUser = async (id: string): Promise<{ data: { user: User } }> => {
  return axiosClient.get('/api/users/' + id.toString());
};

export const reactivateUser = async (id: number) => {
  return axiosClient.post('/api/users/' + id.toString());
};

export const createUser = async (data: UserNoId) => {
  return axiosClient.post('/api/users/', data);
};

export const updateUser = async (
  id: string,
  data: { email: string | null; name?: string | null; phone?: string | null }
) => {
  return axiosClient.patch('/api/users/' + id.toString(), data);
};

export const deleteUser = async (id: number) => {
  return axiosClient.delete('/api/users/' + id.toString());
};

export const updateUserPassword = async (id: string, passwordData: { oldPassword: string; newPassword: string }) => {
  return axiosClient.put('/api/users/' + id + '/password', passwordData);
};

export const updateUserRole = async (id: number, roles: Role[]) => {
  return axiosClient.put('/api/users/' + id + '/roles', { roles: roles });
};

export const getUserRoles = async (id: number) => {
  return axiosClient.get('/api/users/' + id + '/roles');
};

export const getRoles = async () => {
  return axiosClient.get('/api/users/roles');
};
