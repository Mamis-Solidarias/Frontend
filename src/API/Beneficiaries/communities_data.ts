import { axiosClient } from './initialization';
import Community from 'src/types/Community';
import { FamiliesHttp } from 'src/types/Family';

export const createCommunities = async (data: Community[]) => {
  return axiosClient.post('communities', { communities: data });
};

export const getCommunities = async (): Promise<{ data: { communities: Community[] } }> => {
  return axiosClient.get('communities');
};

export const getCommunity = async (id: string): Promise<{ data: Community }> => {
  return axiosClient.get('communities/' + id);
};

export const updateCommunity = async (id: string, data: { address?: string | null; description?: string | null }) => {
  return axiosClient.patch('communities/' + id, data);
};

export const getFamiliesByCommunity = async (
  id: string,
  page: number,
  pageSize: number
): Promise<{ data: FamiliesHttp }> => {
  const query = '?page=' + page + '&pageSize=' + pageSize;

  return axiosClient.get('communities/' + id + '/families' + query);
};

export const createFamilies = async (
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
  return axiosClient.post('communities/' + communityId + '/families', { families });
};
