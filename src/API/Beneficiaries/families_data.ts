import Beneficiary from 'src/types/Beneficiary';
import { authAxiosClient } from './initialization';

export const updateFamily = async (
  loginData: any,
  id: string,
  data: { name?: string | null; address?: string | null; details?: string | null; contacts?: any }
) => {
  return authAxiosClient(loginData).patch('families/' + id, data);
};

export const getFamily = async (loginData: any, id: string) => {
  return authAxiosClient(loginData).get('families/' + id);
};

export const createBeneficiaries = async (loginData: any, id: string, beneficiaries: Beneficiary[]) => {
  return authAxiosClient(loginData).post('families/' + id + '/beneficiaries', { beneficiaries: beneficiaries });
};
