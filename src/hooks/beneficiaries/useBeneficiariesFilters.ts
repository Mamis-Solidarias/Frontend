import { useState } from 'react';
import { BeneficiariesFilters, beneficiariesFiltersDefaults } from 'src/types/BeneficiariesFilters';

export const useBeneficiariesFilters = () => {
  const [filters, setFilters] = useState<BeneficiariesFilters>(beneficiariesFiltersDefaults);

  const setFilter = (field: keyof BeneficiariesFilters, value: any): void => {
    setFilters(oldFilters => ({ ...oldFilters, ...{ [field]: value } }));
  };

  return { filters, setFilter };
};
