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

export const updateCommunity = async (
  loginData: any,
  id: string,
  data: { address?: string | null; description?: string | null }
) => {
  return authAxiosClient(loginData).patch('communities/' + id, data);
};

export const getFamiliesByCommunity = async (loginData: any, id: string, page: number, pageSize: number) => {
  const query = '?page=' + page + '&pageSize=' + pageSize;

  return authAxiosClient(loginData).get('communities/' + id + '/families' + query);
};

export const createFamilies = async (
  loginData: any,
  id: string,
  families: {
    familyNumber: number | null;
    name: string;
    address: string;
    details: string | null;
    contacts: {
      type: string;
      content: string;
      title: string;
      isPreferred: boolean;
    }[];
  }[]
) => {
  return authAxiosClient(loginData).post('communities/' + id + '/families', { families: families });
};
