import { gql } from '@apollo/client';

export const GET_MOCHI = gql`
  query getMochi($edition: String!, $community: String!) {
    mochiEdition(edition: $edition, community: $community) {
      communityId
      description
      edition
      id
      participants {
        beneficiary {
          familyId
        }
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
  query filterQuery($communityId: String) {
    mochiEditions (where: { communityId: {startsWith: $communityId } }) {
      edition
    }
  }
`;
