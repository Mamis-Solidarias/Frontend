import React, { useState, FC, useEffect } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import { BeneficiariesFilters } from 'src/types/BeneficiariesFilters';
import { useBeneficiariesPaging } from 'src/hooks/beneficiaries/useBeneficiariesPaging';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { EducationCard } from './BeneficiaryCard/Education';
import { HealthCard } from './BeneficiaryCard/Health';
import { ClothesCard } from './BeneficiaryCard/Clothes';
import { LikesCard } from './BeneficiaryCard/Likes';
import { CommentsCard } from './BeneficiaryCard/Comments';
import { JobCard } from './BeneficiaryCard/Job';
import Beneficiary from 'src/types/Beneficiary';
import BENEFICIARY_TYPES from 'src/types/BeneficiaryTypes';
import GENDERS from 'src/types/Genders';
import { GET_BENEFICIARIES } from 'src/API/Beneficiaries/beneficiaries_grapql';
import TablePagination from '@mui/material/TablePagination';
import { PAGE_LIMITS } from 'src/types/BeneficiariesPaging';

interface BeneficiariesTableProps {
  filters: BeneficiariesFilters;
}

const BeneficiariesTable: FC<BeneficiariesTableProps> = props => {
  const [open, setOpen] = useState<boolean[]>([]);
  const { filters } = props;
  const { paging, setBeneficiariesPaging } = useBeneficiariesPaging();
  const { loading, error, data, refetch, fetchMore } = useQuery(GET_BENEFICIARIES, {
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
      isActive: !!filters.isActive ? (filters.isActive === 'true' ? true : false) : null,
      after: paging.pageCursor,
      limit: paging.limit
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
      isActive: !!filters.isActive ? (filters.isActive === 'true' ? true : false) : null,
      after: paging.pageCursor,
      limit: paging.limit
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, paging.limit]);

  useEffect(() => {
    fetchMore({
      variables: {
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
        isActive: !!filters.isActive ? (filters.isActive === 'true' ? true : false) : null,
        after: paging.pageCursor,
        limit: paging.limit
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.pageCursor]);

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
  const pageInfo = data.filteredBeneficiaries.pageInfo;
  const edges = data.filteredBeneficiaries.edges;

  return (
    <>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>ID de Familia</TableCell>
                <TableCell>Nombre Completo</TableCell>
                <TableCell>Género</TableCell>
                <TableCell>Fecha de Nacimiento</TableCell>
                <TableCell>Tipo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nodes.map((row: Beneficiary, index: number) => (
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component='div'
          count={pageInfo.hasNextPage ? -1 : nodes.length}
          page={paging.pageNumber}
          rowsPerPageOptions={[PAGE_LIMITS.SMALL, PAGE_LIMITS.MEDIUM, PAGE_LIMITS.LARGE]}
          labelRowsPerPage='Filas por página'
          labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) {
            return `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`;
          }}
          onPageChange={(e, newPageNumber) => {
            if (paging.pageNumber > newPageNumber && paging.previousCursors.length > 0) {
              const newPreviousCursors = paging.previousCursors;
              const newCursor = newPreviousCursors.pop();
              setBeneficiariesPaging('pageNumber', newPageNumber);
              setBeneficiariesPaging('previousCursors', newPreviousCursors);
              setBeneficiariesPaging('pageCursor', newCursor);
            } else if (newPageNumber > paging.pageNumber && pageInfo.hasNextPage) {
              const newPreviousCursors = paging.previousCursors;
              newPreviousCursors.push(edges.cursor);
              const newCursor = pageInfo.endCursor;
              setBeneficiariesPaging('pageNumber', newPageNumber);
              setBeneficiariesPaging('previousCursors', newPreviousCursors);
              setBeneficiariesPaging('pageCursor', newCursor);
            }
          }}
          rowsPerPage={paging.limit}
          onRowsPerPageChange={e => setBeneficiariesPaging('limit', e.target.value)}
        />
      </Card>
    </>
  );
};

export default BeneficiariesTable;
