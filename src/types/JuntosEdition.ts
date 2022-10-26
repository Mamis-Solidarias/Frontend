export interface JuntosEdition {
  edition: number;
  communityId: string;
  beneficiaries: number[];
  description: string;
  provider: string;
  fundraiserGoal: number;
}

export const defaultEdition: JuntosEdition = {
  edition: -1,
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
