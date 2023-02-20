import { axiosClient } from './initialization';
import Community from 'src/types/beneficiaries/Community';

export const createCommunities = async (data: Community[]) => {
  return axiosClient.post('communities', { communities: data });
};

export const updateCommunity = async (id: string, data: { address?: string | null; description?: string | null }) => {
  return axiosClient.patch('communities/' + id, data);
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
