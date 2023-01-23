export interface BeneficiariesFilters {
  ageStart?: string | null;
  ageEnd?: string | null;
  lastName?: string | null;
  firstName?: string | null;
  type?: string | null;
  dniStarts?: string | null;
  familyId?: string | null;
  communityId?: string | null;
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
  communityId: '',
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
  communityId: null,
  communityCode: null,
  school: null,
  gender: null,
  isActive: 'true',
  familyName: null
};
