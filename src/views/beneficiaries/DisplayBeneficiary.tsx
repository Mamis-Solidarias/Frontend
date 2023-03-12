import React, { FC } from 'react';

// ** MUI Imports
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ** Types Imports
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { EducationCard } from './BeneficiaryCard/Education';
import { HealthCard } from './BeneficiaryCard/Health';
import { ClothesCard } from './BeneficiaryCard/Clothes';
import { LikesCard } from './BeneficiaryCard/Likes';
import { CommentsCard } from './BeneficiaryCard/Comments';
import { JobCard } from './BeneficiaryCard/Job';
import Beneficiary from 'src/types/beneficiaries/Beneficiary';
import BENEFICIARY_TYPES from 'src/types/beneficiaries/BeneficiaryTypes';
import GENDERS from 'src/types/beneficiaries/Genders';

interface DisplayBeneficiaryProps {
  benef: Beneficiary;
  key: number;
  index: number;
  open: boolean[];
  setOpen: (open: boolean[]) => void;
  benefsQ: number;
}

const DisplayBeneficiary: FC<DisplayBeneficiaryProps> = props => {
  const { benef, index, open, setOpen, benefsQ } = props;

  return (
    <React.Fragment key={benef.id}>
      <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => {
              setOpen(
                Array.from({ length: benefsQ }, (l, openKey) => {
                  if (openKey === index) {
                    return !open[index];
                  }

                  return open[openKey];
                })
              );
            }}
          >
            {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{benef.dni}</TableCell>
        <TableCell>{benef.familyId}</TableCell>
        <TableCell>{benef.firstName + ' ' + benef.lastName}</TableCell>
        <TableCell>{GENDERS[benef.gender as keyof typeof GENDERS]}</TableCell>
        <TableCell>{new Date(benef.birthday).toLocaleDateString('es-AR')}</TableCell>
        <TableCell>{BENEFICIARY_TYPES[benef.type as keyof typeof BENEFICIARY_TYPES]}</TableCell>
        {props.children}
      </TableRow>
      <TableRow sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open[index]} timeout='auto' unmountOnExit>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
              {!!benef.education && <EducationCard education={benef.education} sx={{ mx: '1em' }} />}
              {!!benef.health && <HealthCard health={benef.health} sx={{ mx: '1em' }} />}
              {!!benef.clothes && <ClothesCard clothes={benef.clothes} sx={{ mx: '1em' }} />}
              {!!benef.comments && <CommentsCard comments={benef.comments} sx={{ mx: '1em' }} />}
              {!!benef.likes && <LikesCard likes={benef.likes} sx={{ mx: '1em' }} />}
              {!!benef.job && <JobCard job={benef.job} sx={{ mx: '1em' }} />}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default DisplayBeneficiary;
