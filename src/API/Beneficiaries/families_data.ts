import { authAxiosClient } from './initialization';

export const updateFamily = async (
  loginData: any,
  id: string,
  data: { name?: string; address?: string; details?: string; contacts?: any }
) => {
  return authAxiosClient(loginData).patch('familias/' + id, data);
};

export const getFamily = async (loginData: any, id: string) => {
  return authAxiosClient(loginData).get('familias/' + id);
};

export const addBeneficiaries = async (
  loginData: any,
  id: string,
  beneficiaries: {
    firstName: string;
    lastName: string;
    type: string;
    gender: string;
    birthday: string;
    dni: string;
    comments?: string;
    likes?: string;
    clothes?: any;
    education?: string;
    health: {
      hasCovidVaccine: boolean;
      hasMandatoryVaccines: boolean;
      observations: string;
    };
    job: any;
  }[]
) => {
  return authAxiosClient(loginData).post('familias/' + id + '/beneficiaries', { beneficiaries: beneficiaries });
};
