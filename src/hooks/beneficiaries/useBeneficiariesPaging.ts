import { useState } from 'react';
import { BeneficiariesPaging, defaultPagingSettings } from 'src/types/beneficiaries/BeneficiariesPaging';

export const useBeneficiariesPaging = () => {
  const [paging, setPaging] = useState<BeneficiariesPaging>(defaultPagingSettings);

  const setBeneficiariesPaging = (field: keyof BeneficiariesPaging, value: any) => {
    setPaging(oldPaging => ({ ...oldPaging, ...{ [field]: value } }));
  };

  return { paging, setBeneficiariesPaging };
};
