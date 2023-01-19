import { useState } from 'react';
import { DonorsPaging, defaultPagingSettings } from 'src/types/donors/DonorsPaging';

export const useDonorsPaging = () => {
  const [paging, setPaging] = useState<DonorsPaging>(defaultPagingSettings);

  const setDonorsPaging = (field: keyof DonorsPaging, value: any) => {
    setPaging(oldPaging => ({ ...oldPaging, ...{ [field]: value } }));
  };

  return { paging, setDonorsPaging };
};
