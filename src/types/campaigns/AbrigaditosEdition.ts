import GENDERS from '../beneficiaries/Genders';

export interface AbrigaditosEdition {
  id?: string;
  edition: string;
  communityId: string;
  beneficiaries: number[];
  participants?: Participant[];
  donations: { id: string }[];
  description: string;
  provider: string;
  fundraiserGoal: number;
  totalDonations: number;
}

export interface Participant {
  beneficiaryId: number;
  beneficiaryGender: keyof typeof GENDERS;
  beneficiary: {name: string};
  shirtSize: number;
}

export const defaultEdition: AbrigaditosEdition = {
  edition: '',
  communityId: '',
  beneficiaries: [],
  donations: [],
  description: '',
  provider: '',
  fundraiserGoal: 0,
  totalDonations: 0
};

export interface AbrigaditosEditionModify {
  description: string;
  provider: string;
  fundraiserGoal: number;
  addedBeneficiaries: number[];
  removedBeneficiaries: number[];
  newBeneficiaries: number[];
}

export const defaultEditionModify: AbrigaditosEditionModify = {
  description: '',
  provider: '',
  fundraiserGoal: 0,
  addedBeneficiaries: [],
  removedBeneficiaries: [],
  newBeneficiaries: []
};
