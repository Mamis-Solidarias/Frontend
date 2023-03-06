import { gql } from '@apollo/client';

export const GET_DONATIONS = gql`
  query getDonations($after: String, $first: Int, $filter: DonationsFilterInput) {
    donations(after: $after, first: $first, filter: $filter) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
      }
      nodes {
        amount
        currency
        donatedAt
        donorId
        donor {
          name
        }
        id
        motive
        type
      }
    }
  }`;
