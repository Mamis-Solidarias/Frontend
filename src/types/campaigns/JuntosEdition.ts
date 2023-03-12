import GENDERS from '../beneficiaries/Genders';

export interface JuntosEdition {
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
  beneficiaryName: string;
  shoeSize: number;
}

export const defaultEdition: JuntosEdition = {
  edition: '',
  communityId: '',
  beneficiaries: [],
  donations: [],
  description: '',
  provider: '',
  totalDonations: 0,
  fundraiserGoal: 0
};

export interface JuntosEditionModify {
  description: string;
  provider: string;
  fundraiserGoal: number;
  addedBeneficiaries: number[];
  removedBeneficiaries: number[];
  newBeneficiaries: number[];
}

export const defaultEditionModify: JuntosEditionModify = {
  description: '',
  provider: '',
  fundraiserGoal: 0,
  addedBeneficiaries: [],
  removedBeneficiaries: [],
  newBeneficiaries: []
};
