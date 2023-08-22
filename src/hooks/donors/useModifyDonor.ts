import { useState } from 'react';
import { Donor } from 'src/types/donors/Donor';

export const defaultDonor = {
  name: '',
  email: '',
  phone: '',
  mercadoPagoEmail: '',
  dni: '',
  isGodFather: false
};

export const useModifyDonor = () => {
  const [donor, setDonor] = useState<Donor>({...defaultDonor});

  const setDonorField = (field: keyof Donor, value: any) => {
    setDonor(oldDonor => ({ ...oldDonor, ...{ [field]: value } }));
  };

  return { donor, setDonor, setDonorField };
};
