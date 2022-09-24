import Education from 'src/types/Education';
import Health from 'src/types/Health';
import Job from 'src/types/Job';
import { authAxiosClient } from './initialization';

export const activateBeneficiary = async (loginData: any, id: string) => {
  return authAxiosClient(loginData).post('/beneficiaries/' + id);
};

export const deleteBeneficiary = async (loginData: any, id: string) => {
  return authAxiosClient(loginData).delete('/beneficiaries/' + id);
};

export const updateBeneficiary = async (
  loginData: any,
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
    education?: Education;
    health?: Health;
    job: Job;
  }
) => {
  return authAxiosClient(loginData).patch('/beneficiaries/' + id, data);
};
