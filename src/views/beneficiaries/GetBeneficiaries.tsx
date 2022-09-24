import { useQuery, gql } from '@apollo/client';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { FC } from 'react';
import { Education } from './BeneficiaryCard/Education';
import { Health } from './BeneficiaryCard/Health';
import { Clothes } from './BeneficiaryCard/Clothes';
import { Likes } from './BeneficiaryCard/Likes';
import { Comments } from './BeneficiaryCard/Comments';
import { Job } from './BeneficiaryCard/Job';
import Beneficiary from 'src/types/Beneficiary';
import BENEFICIARY_TYPES from 'src/types/BeneficiaryTypes';
import GENDERS from 'src/types/Genders';

const GET_BENEFICIARIES = gql`
  query getBeneficiaries {
    beneficiaries {
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

export const GetBeneficiaries: FC<{ open: boolean[]; setOpen: (value: boolean[]) => void }> = props => {
  const { open, setOpen } = props;
  const { loading, error, data } = useQuery(GET_BENEFICIARIES);

  if (loading)
    return (
      <TableRow>
        <TableCell>Loading...</TableCell>
      </TableRow>
    );
  if (error)
    return (
      <TableRow>
        <TableCell>Error :(</TableCell>
      </TableRow>
    );

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
              {!!row.education && <Education education={row.education} sx={{ mx: '1em' }} />}
              {!!row.health && <Health health={row.health} sx={{ mx: '1em' }} />}
              {!!row.clothes && <Clothes clothes={row.clothes} sx={{ mx: '1em' }} />}
              {!!row.comments && <Comments comments={row.comments} sx={{ mx: '1em' }} />}
              {!!row.likes && <Likes likes={row.likes} sx={{ mx: '1em' }} />}
              {!!row.job && <Job job={row.job} sx={{ mx: '1em' }} />}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  ));
};
