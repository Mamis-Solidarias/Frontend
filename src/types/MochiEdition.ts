import Beneficiary from './Beneficiary';

export interface MochiEdition {
  edition: string;
  communityId: string;
  beneficiaries: number[];
  description: string;
  provider: string;
}

export const defaultEdition: MochiEdition = {
  edition: '',
  communityId: '',
  beneficiaries: [],
  description: '',
  provider: ''
};

export interface MochiEditionModify {
  description: string;
  provider: string;
  fundraiserGoal: number;
  addedBeneficiaries: number[];
  removedBeneficiaries: number[];
}

export const defaultMochiEditionModify: MochiEditionModify = {
  description: '',
  provider: '',
  fundraiserGoal: 0,
  addedBeneficiaries: [],
  removedBeneficiaries: []
};

export interface MochiImport {
  edition: string;
  communityId: string;
}

export const defaultMochiImport: MochiImport = {
  edition: '',
  communityId: ''
};

export interface Participant {
  beneficiary: Beneficiary;
  beneficiaryGender: string;
  beneficiaryId: number;
  beneficiaryName: string;
  donationDropOffLocation: string | null;
  donationType: string | null;
  donorName: string;
  id: number;
  schoolCycle: string | null;
  state: string;
}

export interface MochiEditionLoaded {
  edition: string;
  communityId: string;
  participants: Participant[];
  description: string;
  provider: string;
}
