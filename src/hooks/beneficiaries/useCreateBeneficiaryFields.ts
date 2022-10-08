import { useState } from 'react';

export interface CreateBeneficiaryFields {
  familyId: string;
  firstName: string;
  lastName: string;
  type: string;
  gender: string;
  birthday: string;
  dni: string;
  comments: string;
  likes: string;
  school: string;
  transportationMethod: string;
  year: string;
  pantsSize: string;
  shirtSize: string;
  shoeSize: string;
  hasMandatoryVaccines: boolean;
  hasCovidVaccine: boolean;
  observations: string;
  title: string;
}

export const defaultCreateBeneficiaryFields = {
  familyId: '',
  firstName: '',
  lastName: '',
  type: '',
  gender: '',
  birthday: '',
  dni: '',
  comments: '',
  likes: '',
  school: '',
  transportationMethod: '',
  year: '',
  pantsSize: '',
  shirtSize: '',
  shoeSize: '',
  hasMandatoryVaccines: false,
  hasCovidVaccine: false,
  observations: '',
  title: ''
};

export const useCreateBeneficiaryFields = () => {
  const [beneficiaryFields, setBeneficiaryFields] = useState(defaultCreateBeneficiaryFields);

  const setBeneficiaryField = (field: keyof CreateBeneficiaryFields, value: any) => {
    setBeneficiaryFields(oldBeneficiaryFields => ({ ...oldBeneficiaryFields, ...{ [field]: value } }));
  };

  return { beneficiaryFields, setBeneficiaryField, setBeneficiaryFields };
};
