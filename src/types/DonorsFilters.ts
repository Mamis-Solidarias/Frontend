export interface DonorsFilters {
  ageStart?: string | null;
  ageEnd?: string | null;
  lastName?: string | null;
  firstName?: string | null;
  type?: string | null;
  dniStarts?: string | null;
  familyId?: string | null;
  communityCode?: string | null;
  school?: string | null;
  gender?: string | null;
  isActive?: string | null;
  familyName?: string | null;
}

export const donorsFiltersDefaults: DonorsFilters = {};

export const donorsFiltersNull: DonorsFilters = {};
