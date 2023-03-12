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
        campaignId
        beneficiaryGender
        beneficiaryId
        beneficiaryName
        donationId
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
    mochiEditions(where: { communityId: { startsWith: $communityId } }) {
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
        beneficiaryGender
        beneficiaryName
        shoeSize
      }
      donations {
        id
      }
      totalDonations
      shoeDetails {
        count
        gender
        size
      }
      provider
    }
  }
`;

export const GET_DONATION = gql`
  query donationsQuery($id: UUID!) {
    monetaryDonation(id: $id) {
      amount
      currency
      donatedAt
      donor {
        name
      }
      id
      motive
      type
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

export const GET_ABRIGADITOS = gql`
  query getAbrigaditos($edition: String!, $community: String!) {
    abrigaditosCampaign(edition: $edition, community: $community) {
      communityId
      description
      edition
      id
      fundraiserGoal
      participants {
        beneficiaryId
        beneficiaryGender
        beneficiaryName
        shirtSize
      }
      donations {
        id
      }
      totalDonations
      provider
    }
  }
`;

export const GET_ABRIGADITOS_EDITIONS = gql`
  query filterQuery {
    abrigaditosCampaigns {
      edition
    }
  }
`;
