import { useState } from 'react';
import { Donor } from 'src/types/Donor';

export const defaultDonor = {
  name: '',
  email: '',
  phone: '',
  mercadoPagoEmail: '',
  dni: '',
  isGodFather: false
};

export const useModifyDonor = (entryDonor?: Donor | null) => {
  const [donor, setDonor] = useState<Donor>(!!entryDonor ? entryDonor : defaultDonor);

  const setDonorField = (field: keyof Donor, value: any) => {
    setDonor(oldDonor => ({ ...oldDonor, ...{ [field]: value } }));
  };

  return { donor, setDonor, setDonorField };
};
