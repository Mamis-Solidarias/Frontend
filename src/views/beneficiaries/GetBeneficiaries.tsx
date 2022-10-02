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

interface GetBeneficiariesProps {
  ageStart?: number | null;
  ageEnd?: number | null;
  lastNameContains?: string;
  type?: string;
  dniStarts?: string | null;
  familyId?: string;
  communityId?: string;
  school?: string;
  gender?: string;
  isActive?: boolean;
}

const GET_BENEFICIARIES = gql`
  query getBeneficiaries($dniStarts: String) {
    beneficiaries(where: { dni: { eq: $dniStarts } }) {
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
}

export const GetBeneficiaries: FC<GetBeneficiariesProps> = props => {
  const { ageStart, ageEnd, lastNameContains, type, dniStarts, familyId, communityId, school, gender, isActive } =
    props;

  const { open, setOpen } = props;
  const { loading, error, data, refetch } = useQuery(GET_BENEFICIARIES, {
    variables: {
      ageStart,
      ageEnd,
      lastNameContains,
      type,
      dniStarts,
      familyId,
      communityId,
      school,
      gender,
      isActive
    }
  });

  useEffect(() => {
    refetch({
      ageStart,
      ageEnd,
      lastNameContains,
      type,
      dniStarts,
      familyId,
      communityId,
      school,
      gender,
      isActive
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ageStart, ageEnd, lastNameContains, type, dniStarts, familyId, communityId, school, gender, isActive]);

  if (loading)
    return (
      <TableRow>
        <TableCell>Loading...</TableCell>
      </TableRow>
    );
  if (error) {
    console.log(error);

    return (
      <TableRow>
        <TableCell>Error :(</TableCell>
      </TableRow>
    );
  }

  const nodes = data.beneficiaries.nodes;

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
