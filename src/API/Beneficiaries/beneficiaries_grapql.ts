import { gql } from '@apollo/client';

export const GET_BENEFICIARIES = gql`
  query filterQuery(
    $dniStarts: String
    $ageStart: Int
    $ageEnd: Int
    $firstName: String
    $lastName: String
    $type: String
    $familyId: String
    $communityId: String
    $school: String
    $gender: String
    $isActive: Boolean
    $after: String
    $limit: Int
  ) {
    filteredBeneficiaries(
      filter: {
        dniStarts: $dniStarts
        ageStart: $ageStart
        ageEnd: $ageEnd
        lastName: $lastName
        firstName: $firstName
        type: $type
        familyId: $familyId
        communityId: $communityId
        school: $school
        gender: $gender
        isActive: $isActive
      }
      after: $after
      first: $limit
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
      }
      nodes {
        dni
        birthday
        comments
        familyId
        family {
          communityId
        }
        firstName
        gender
        id
        isActive
        lastName
        likes
        type
        clothes {
          pantsSize
          shoeSize
          shirtSize
        }
        health {
          hasCovidVaccine
          hasMandatoryVaccines
          observations
        }
        education {
          school
          year
          transportationMethod
        }
        job {
          title
        }
      }
    }
  }
`;

export const GET_COMMUNITIES = gql`
  query filterQuery($after: String, $limit: Int) {
    communities(after: $after, first: $limit) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
      }
      nodes {
        id
        address
        description
        name
      }
    }
  }
`;
