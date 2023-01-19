import { useState } from 'react';
import { DonorsFilters, donorsFiltersDefaults } from 'src/types/donors/DonorsFilters';

export const useDonorsFilters = () => {
  const [filters, setFilters] = useState<DonorsFilters>(donorsFiltersDefaults);

  const setFilter = (field: keyof DonorsFilters, value: any): void => {
    setFilters(oldFilters => ({ ...oldFilters, ...{ [field]: value } }));
  };

  return { filters, setFilter };
};
