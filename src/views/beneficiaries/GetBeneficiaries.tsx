import { useQuery, gql } from '@apollo/client';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { FC, useEffect } from 'react';
import { EducationCard } from './BeneficiaryCard/Education';
import { HealthCard } from './BeneficiaryCard/Health';
import { ClothesCard } from './BeneficiaryCard/Clothes';
import { LikesCard } from './BeneficiaryCard/Likes';
import { CommentsCard } from './BeneficiaryCard/Comments';
import { JobCard } from './BeneficiaryCard/Job';
import Beneficiary from 'src/types/Beneficiary';
import BENEFICIARY_TYPES from 'src/types/BeneficiaryTypes';
import GENDERS from 'src/types/Genders';
import { BeneficiariesFilters } from 'src/types/BeneficiariesFilters';

const GET_BENEFICIARIES = gql`
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
    ) {
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
interface GetBeneficiariesProps {
  open: boolean[];
  setOpen: (value: boolean[]) => void;
  filters: BeneficiariesFilters;
}

export const GetBeneficiaries: FC<GetBeneficiariesProps> = props => {
  const { filters } = props;

  const { open, setOpen } = props;
  const { loading, error, data, refetch } = useQuery(GET_BENEFICIARIES, {
    variables: {
      ageStart: isNaN(parseInt(filters.ageStart as string)) ? filters.ageStart : parseInt(filters.ageStart as string),
      ageEnd: isNaN(parseInt(filters.ageEnd as string)) ? filters.ageEnd : parseInt(filters.ageEnd as string),
      firstName: filters.firstName,
      lastName: filters.lastName,
      type: filters.type,
      dniStarts: filters.dniStarts,
      familyId: filters.familyId,
      communityId: filters.communityCode,
      school: filters.school,
      gender: filters.gender,
      isActive: !!filters.isActive ? (filters.isActive === 'true' ? true : false) : null
    }
  });

  useEffect(() => {
    refetch({
      ageStart: isNaN(parseInt(filters.ageStart as string)) ? filters.ageStart : parseInt(filters.ageStart as string),
      ageEnd: isNaN(parseInt(filters.ageEnd as string)) ? filters.ageEnd : parseInt(filters.ageEnd as string),
      lastName: filters.lastName,
      firstName: filters.firstName,
      type: filters.type,
      dniStarts: filters.dniStarts,
      familyId: filters.familyId,
      communityId: filters.communityCode,
      school: filters.school,
      gender: filters.gender,
      isActive: !!filters.isActive ? (filters.isActive === 'true' ? true : false) : null
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  if (loading)
    return (
      <TableRow>
        <TableCell>Loading...</TableCell>
      </TableRow>
    );
  if (error) {
    return (
      <TableRow>
        <TableCell>Error :(</TableCell>
      </TableRow>
    );
  }

  const nodes = data.filteredBeneficiaries.nodes;

  return nodes.map((row: Beneficiary, index: number) => (
    <React.Fragment key={row.id}>
      <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => {
              if (open.length === 0) {
                setOpen(
                  Array.from({ length: nodes.length }, (l, openIndex) => {
                    if (openIndex === index) return true;

                    return false;
                  })
                );
              } else {
                setOpen(
                  Array.from({ length: nodes.length }, (l, openIndex) => {
                    if (openIndex === index) {
                      return !open[index];
                    }

                    return open[openIndex];
                  })
                );
              }
            }}
          >
            {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.dni}</TableCell>
        <TableCell>{row.familyId}</TableCell>
        <TableCell>{row.firstName + ' ' + row.lastName}</TableCell>
        <TableCell>{GENDERS[row.gender as keyof typeof GENDERS]}</TableCell>
        <TableCell>{row.birthday}</TableCell>
        <TableCell>{BENEFICIARY_TYPES[row.type as keyof typeof BENEFICIARY_TYPES]}</TableCell>
      </TableRow>
      <TableRow sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
        <TableCell colSpan={12}>
          <Collapse in={open[index]} timeout='auto' unmountOnExit>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
              {!!row.education && <EducationCard education={row.education} sx={{ mx: '1em' }} />}
              {!!row.health && <HealthCard health={row.health} sx={{ mx: '1em' }} />}
              {!!row.clothes && <ClothesCard clothes={row.clothes} sx={{ mx: '1em' }} />}
              {!!row.comments && <CommentsCard comments={row.comments} sx={{ mx: '1em' }} />}
              {!!row.likes && <LikesCard likes={row.likes} sx={{ mx: '1em' }} />}
              {!!row.job && <JobCard job={row.job} sx={{ mx: '1em' }} />}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  ));
};
