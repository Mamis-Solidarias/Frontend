import { useState } from 'react';
import { CampaignsFilters, campaignsFiltersDefault } from 'src/types/CampaignsFilters';

export const useCampaignsFilters = () => {
  const [filters, setFilters] = useState<CampaignsFilters>(campaignsFiltersDefault);

  const setFilter = (field: keyof CampaignsFilters, value: any): void => {
    setFilters(oldFilters => ({ ...oldFilters, ...{ [field]: value } }));
  };

  return { filters, setFilter };
};
