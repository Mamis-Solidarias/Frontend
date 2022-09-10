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
  }
) => {
  return authAxiosClient(loginData).patch('/beneficiaries/' + id, data);
};
