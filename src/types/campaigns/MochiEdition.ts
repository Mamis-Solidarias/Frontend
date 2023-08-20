import Beneficiary from '../beneficiaries/Beneficiary';

export interface MochiEdition {
  edition: string;
  communityId: string;
  beneficiaries: number[];
  participants?: Participant[];
  description: string;
  provider: string;
}

export const defaultEdition: MochiEdition = {
  edition: '',
  communityId: '',
  description: '',
  provider: '',
  beneficiaries: []
};

export interface MochiEditionModify {
  description: string;
  provider: string;
  fundraiserGoal?: number;
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
  beneficiary: {firstName: string, lastName: string, familyId: string};
  beneficiaryGender: string;
  beneficiaryId: number;
  donationDropOffLocation: string | null;
  donationType: string | null;
  donationId: string;
  donorName: string;
  donorId: number;
  campaignId: number;
  id: number;
  schoolCycle: string | null;
  state: string;
}

export interface MochiEditionLoaded {
  id: string;
  edition: string;
  communityId: string;
  participants: Participant[];
  description: string;
  provider: string;
}
