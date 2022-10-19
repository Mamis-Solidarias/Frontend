import { useState } from 'react';

export interface CreateDonor {
  name: string;
  email: string;
  phone: string;
  isGodFather: boolean;
}

export const defaultDonor = {
  name: '',
  email: '',
  phone: '',
  isGodFather: false
};

export const useCreateDonor = () => {
  const [donor, setDonor] = useState(defaultDonor);

  const setDonorField = (field: keyof CreateDonor, value: any) => {
    setDonor(oldDonor => ({ ...oldDonor, ...{ [field]: value } }));
  };

  return { donor, setDonor, setDonorField };
};
