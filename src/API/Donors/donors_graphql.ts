import { gql } from '@apollo/client';

export const GET_DONORS = gql`
  query filterQuery($after: String, $limit: Int, $isGodFather: Boolean, $donorName: String, $ownerId: Int) {
    filteredDonors(
      after: $after
      first: $limit
      filter: { isGodFather: $isGodFather, name: $donorName, owner: $ownerId }
    ) {
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
          roles
        }
      }
    }
  }
`;
