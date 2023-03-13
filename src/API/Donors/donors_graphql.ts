import { gql } from '@apollo/client';

export const GET_DONORS = gql`
  query filterQuery($after: String, $limit: Int, $isGodFather: Boolean, $name: String, $ownerId: Int) {
    donors(after: $after, first: $limit, filters: { isGodFather: $isGodFather, name: $name, ownerId: $ownerId }) {
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
        mercadoPagoEmail
        dni
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
