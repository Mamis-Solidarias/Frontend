import GENDERS from "../beneficiaries/Genders";

export interface JuntosEdition {
  edition: string;
  communityId: string;
  beneficiaries: number[];
  participants?: Participant[];
  description: string;
  provider: string;
  fundraiserGoal: number;
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
  description: '',
  provider: '',
  fundraiserGoal: 0
};

export interface JuntosEditionModify {
  description: string;
  provider: string;
  fundraiserGoal: number;
  addedBeneficiaries: number[];
  removedBeneficiaries: number[];
}

export const defaultEditionModify: JuntosEditionModify = {
  description: '',
  provider: '',
  fundraiserGoal: 0,
  addedBeneficiaries: [],
  removedBeneficiaries: [],
}
