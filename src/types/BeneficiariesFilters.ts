export interface BeneficiariesFilters {
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

export const beneficiariesFiltersDefaults: BeneficiariesFilters = {
  ageStart: '',
  ageEnd: '',
  lastName: '',
  firstName: '',
  type: '',
  dniStarts: '',
  familyId: '',
  communityCode: '',
  school: '',
  gender: '',
  isActive: 'true',
  familyName: ''
};

export const beneficiariesFiltersNull: BeneficiariesFilters = {
  ageStart: null,
  ageEnd: null,
  lastName: null,
  firstName: null,
  type: null,
  dniStarts: null,
  familyId: null,
  communityCode: null,
  school: null,
  gender: null,
  isActive: 'true'
};
