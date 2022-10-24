import Education from 'src/types/Education';
import Health from 'src/types/Health';
import Job from 'src/types/Job';
import { axiosClient } from './initialization';

export const activateBeneficiary = async (id: string) => {
  return axiosClient.post('/beneficiaries/' + id);
};

export const deleteBeneficiary = async (id: string) => {
  return axiosClient.delete('/beneficiaries/' + id);
};

export const updateBeneficiary = async (
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    type?: string;
    gender?: string;
    birthday?: string;
    dni?: string;
    comments?: string;
    likes?: string;
    clothes?: any;
    education?: Education | null;
    health?: Health | null;
    job?: Job | null;
  }
) => {
  return axiosClient.patch('/beneficiaries/' + id, data);
};
