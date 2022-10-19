import { gql } from '@apollo/client';

export const GET_DONORS = gql`
  query filterQuery($after: String, $limit: Int) {
    donors(after: $after, first: $limit) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
      }
      nodes {
        id
        createdBy
        name
        isGodFather
        email
        phone
        owner {
          email
          id
          isActive
          name
          phone
        }
      }
    }
  }
`;
