import { authAxiosClient } from './initialization';
import Community from 'src/types/Community';
import Family from 'src/types/Family';

export const createCommunities = async (loginData: any, data: Community[]) => {
  return authAxiosClient(loginData).post('communities', { communities: data });
};

export const getCommunities = async (loginData: any): Promise<{ data: { communities: Community[] } }> => {
  return authAxiosClient(loginData).get('communities');
};

export const getCommunity = async (loginData: any, id: string): Promise<{ data: Community }> => {
  return authAxiosClient(loginData).get('communities/' + id);
};

export const updateCommunity = async (
  loginData: any,
  id: string,
  data: { address?: string | null; description?: string | null }
) => {
  return authAxiosClient(loginData).patch('communities/' + id, data);
};

export const getFamiliesByCommunity = async (
  loginData: any,
  id: string,
  page: number,
  pageSize: number
): Promise<{ data: Family[] }> => {
  const query = '?page=' + page + '&pageSize=' + pageSize;

  return authAxiosClient(loginData).get('communities/' + id + '/families' + query);
};

export const createFamilies = async (
  loginData: any,
  communityId: string,
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
  return authAxiosClient(loginData).post('communities/' + communityId + '/families', { families });
};
