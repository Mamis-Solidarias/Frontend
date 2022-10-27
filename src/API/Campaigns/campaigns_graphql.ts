import { gql } from '@apollo/client';

export const GET_MOCHI = gql`
  query filterQuery($edition: String) {
    mochiEditions(where: { edition: $edition }) {
      communityId
      description
      edition
      id
      participants {
        beneficiaryGender
        beneficiaryId
        beneficiaryName
        donationDropOffLocation
        donationType
        donorId
        donorName
        id
        schoolCycle
        state
      }
      provider
    }
  }
`;

export const GET_MOCHIS = gql`
  query filterQuery($edition: String) {
    mochiEditions {
      communityId
      description
      edition
      id
      participants {
        beneficiaryGender
        beneficiaryId
        beneficiaryName
        donationDropOffLocation
        donationType
        donorId
        donorName
        id
        schoolCycle
        state
      }
      provider
    }
  }
`;

export const GET_MOCHI_EDITIONS = gql`
  query filterQuery {
    mochiEditions {
      edition
    }
  }
`;
