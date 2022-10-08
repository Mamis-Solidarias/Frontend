import { useState } from 'react';

export interface CreateBeneficiaryExtras {
  addEducation: boolean;
  addClothes: boolean;
  addHealth: boolean;
  addJob: boolean;
}

export const defaultCreateBeneficiaryExtras = {
  addEducation: false,
  addClothes: false,
  addHealth: false,
  addJob: false
};

export const useCreateBeneficiaryExtras = () => {
  const [beneficiaryExtras, setBeneficiaryExtras] = useState(defaultCreateBeneficiaryExtras);

  const setBeneficiaryExtra = (field: keyof CreateBeneficiaryExtras, value: any) => {
    setBeneficiaryExtras(oldBeneficiaryExtras => ({ ...oldBeneficiaryExtras, ...{ [field]: value } }));
  };

  return { beneficiaryExtras, setBeneficiaryExtra, setBeneficiaryExtras };
};
