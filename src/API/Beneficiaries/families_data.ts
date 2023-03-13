import Beneficiary from 'src/types/beneficiaries/Beneficiary';
import { axiosClient } from './initialization';

export const updateFamily = async (
  id: string,
  data: { name?: string | null; address?: string | null; details?: string | null; contacts?: any }
) => {
  return axiosClient.patch('families/' + id, data);
};

export const createBeneficiaries = async (id: string, beneficiaries: Beneficiary[]) => {
  for (const beneficiary of beneficiaries) {
    if (!beneficiary.education) continue;

    if (beneficiary.education!.year?.trim() === '') {
      beneficiary.education!.year = null;
    } else if (beneficiary.education!.year !== null) {
      beneficiary.education!.year = beneficiary.education!.year!.replaceAll('_', '');
    }

    if (beneficiary.education!.transportationMethod?.trim() === '') {
      beneficiary.education!.transportationMethod = null;
    }
  }

  return axiosClient.post('families/' + id + '/beneficiaries', { beneficiaries: beneficiaries });
};
