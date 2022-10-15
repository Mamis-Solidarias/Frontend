import Donor from 'src/types/Donors';
import { axiosClient } from './initialization';

export const createDonors = async (data: Donor[]) => {
  return axiosClient.post('donors', { donors: data });
};

export const updateDonor = async (
  id: string,
  data: { name?: string | null; email?: string | null; phone?: string | null; isGodFather?: string | null }
) => {
  return axiosClient.put('donors/' + id, data);
};
