import { Donor } from 'src/types/Donor';
import { axiosClient } from './initialization';

export const createDonor = async (data: Donor) => {
  return axiosClient.post('donors', data);
};

export const updateDonor = async (
  id: string,
  data: { name?: string | null; email?: string | null; phone?: string | null; isGodFather?: boolean | null }
) => {
  return axiosClient.put('donors/' + id, data);
};
