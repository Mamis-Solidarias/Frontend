import Education from 'src/types/beneficiaries/Education';
import Health from 'src/types/beneficiaries/Health';
import Job from 'src/types/beneficiaries/Job';
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
  if (data.education !== null) {
    if (data.education!.year?.trim() === '') {
      data.education!.year = null;
    } else if (data.education!.year !== null) {
      data.education!.year = data.education!.year!.replaceAll('_', '');
    }

    if (data.education!.transportationMethod?.trim() === '') {
      data.education!.transportationMethod = null;
    }
  }

  return axiosClient.patch('/beneficiaries/' + id, data);
};
