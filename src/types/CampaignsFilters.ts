export interface CampaignsFilters {
  beneficiaryName?: string | null;
  gender?: string | null;
  cycle?: string | null;
  bonusKits?: string | null;
  donorName?: string | null;
  state?: string | null;
  edition?: string | null;
}

export const campaignsFiltersDefault: CampaignsFilters = {
  beneficiaryName: '',
  gender: '',
  cycle: '',
  bonusKits: '',
  donorName: '',
  state: '',
  edition: ''
};

export const campaignsFiltersNull: CampaignsFilters = {
  beneficiaryName: null,
  gender: null,
  cycle: null,
  bonusKits: null,
  donorName: null,
  state: null,
  edition: null
};
