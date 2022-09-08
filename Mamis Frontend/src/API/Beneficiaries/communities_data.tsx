import { authAxiosClient } from './initialization';

export const createCommunities = async (
  loginData: any,
  data: { name: string; address: string; description: string | null; communityCode: string | null }[]
) => {
  return authAxiosClient(loginData).post('communities', { communities: data });
};

export const getCommunities = async (loginData: any) => {
  return authAxiosClient(loginData).get('communities');
};

export const getCommunity = async (loginData: any, id: string) => {
  return authAxiosClient(loginData).get('communities/' + id);
};
