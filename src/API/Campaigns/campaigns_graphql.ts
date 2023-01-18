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
        donationDropOffPoint
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

export const GET_JUNTOS = gql`
  query getJuntos($edition: String!, $community: String!) {
    juntosCampaign(edition: $edition, community: $community) {
      communityId
      description
      edition
      id
      fundraiserGoal
      participants {
        beneficiaryId
      }
      donations {
        id
      }
      shoeDetails {
        count
        gender
        size
      }
      provider
    }
  }
`;

export const GET_JUNTOS_EDITIONS = gql`
  query filterQuery {
    juntosCampaigns {
      edition
    }
  }
`;
