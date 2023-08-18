import React, { FC } from 'react';

// ** MUI Imports
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { UpdateFamily } from './UpdateFamily';
import { UpdateFamilyContacts } from './UpdateFamilyContacts';
import Contact from 'src/types/beneficiaries/Contact';
import Family from 'src/types/beneficiaries/Family';
import { BeneficiariesFilters } from 'src/types/beneficiaries/BeneficiariesFilters';
import Community from 'src/types/beneficiaries/Community';
import { GET_FAMILIES } from 'src/API/Beneficiaries/beneficiaries_grapql';
import { useBeneficiariesPaging } from 'src/hooks/beneficiaries/useBeneficiariesPaging';
import { useQuery } from '@apollo/client';
import BeneficiaryTablePagination from '../beneficiaries/BeneficiaryTablePagination';
import { useRouter } from 'next/router';
import { Action } from 'src/types/Action';
import { hasWriteAccess, userIsLoggedIn } from 'src/utils/sessionManagement';
import { Card, CardHeader, LinearProgress, Typography } from '@mui/material';
import { DetailsCard } from './Cards/DetailsCard';
import { ContactsCard } from './Cards/ContactsCard';

interface FamiliesTableProps {
  communities: Community[];
  filters: BeneficiariesFilters;
  openCreateFamilies: boolean;
  setAction: (action: Action) => void;
  children: any;
}

const FamiliesTable: FC<FamiliesTableProps> = props => {
  const { filters, openCreateFamilies, setAction } = props;
  const router = useRouter();
  const [open, setOpen] = useState<boolean[]>([]);
  const [id, setId] = useState<string>('');
  const [openUpdateFamily, setOpenUpdateFamily] = useState<boolean>(false);
  const [openUpdateContacts, setOpenUpdateContacts] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { paging, setBeneficiariesPaging } = useBeneficiariesPaging();
  const [hasWriteBenefs, setHasWriteBenefs] = useState<boolean>(false);
  const { loading, error, data, refetch } = useQuery(GET_FAMILIES, {
    variables: {
      communityCode: filters.communityCode,
      familyName: filters.familyName,
      after: paging.pageCursor,
      limit: paging.limit
    }
  });

  const refetchWithSameParameters = () => {
    refetch({
      communityCode: filters.communityCode,
      familyName: filters.familyName,
      after: paging.pageCursor,
      limit: paging.limit
    });
  };

  useEffect(() => {
    if (!userIsLoggedIn()) {
      router.push('/login');
    }
    setHasWriteBenefs(hasWriteAccess('Beneficiaries'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refetchWithSameParameters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.pageCursor, filters, paging.limit]);

  useEffect(() => {
    if (userIsLoggedIn() && !openUpdateFamily && !openUpdateContacts && !openCreateFamilies) {
      refetchWithSameParameters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openUpdateContacts, openUpdateFamily, openCreateFamilies]);

  if (error) {
    router.push('/login');

    return (
      <TableRow>
        <TableCell>Error :(</TableCell>
      </TableRow>
    );
  }

  const nodes = data === undefined ? [] : data.filteredFamilies.nodes;
  const pageInfo = data === undefined ? undefined : data.filteredFamilies.pageInfo;
  const edges = data === undefined ? [] : data.filteredFamilies.edges;
  const totalCount = data === undefined ? [] : data.filteredFamilies.totalCount;

  return (
    <Card>
      <CardHeader action={props.children} title='Familias' titleTypographyProps={{ variant: 'h6' }} />
      <TableContainer>
        {loading && <LinearProgress />}
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              {hasWriteBenefs && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {nodes.map((row: Family, index: number) => (
              <>
                <TableRow hover key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  {hasWriteBenefs && (
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
                  )}
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.address}</TableCell>
                  {hasWriteBenefs && (
                    <TableCell>
                      <Box display='flex' flexDirection='row' justifyContent='start'>
                        <Button
                          variant='contained'
                          sx={{ mx: '.5em' }}
                          onClick={() => {
                            setId(row.id as string);
                            setOpenUpdateFamily(true);
                          }}
                        >
                          <Typography color={'white'}> Editar Datos</Typography>
                        </Button>
                        <Button
                          variant='contained'
                          sx={{ mx: '.5em' }}
                          onClick={() => {
                            setId(row.id as string);
                            setContacts(row.contacts);
                            setOpenUpdateContacts(true);
                          }}
                        >
                          <Typography color={'white'}>Editar Contactos</Typography>
                        </Button>
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
                <TableRow sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open[index]} timeout='auto' unmountOnExit>
                      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                        {!!row.details && <DetailsCard details={row.details} />}
                        {!!row.contacts && row.contacts.length > 0 && <ContactsCard contacts={row.contacts} />}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pageInfo !== undefined && (
        <BeneficiaryTablePagination
          totalCount={totalCount}
          paging={paging}
          setBeneficiariesPaging={setBeneficiariesPaging}
          pageInfo={pageInfo}
          nodes={nodes}
          edges={edges}
        />
      )}

      {openUpdateFamily && (
        <UpdateFamily
          openDialog={openUpdateFamily}
          id={id}
          handleClose={() => {
            setOpenUpdateFamily(false);
          }}
          setAction={setAction}
        />
      )}
      {openUpdateContacts && (
        <UpdateFamilyContacts
          openDialog={openUpdateContacts}
          id={id}
          contacts={contacts}
          handleClose={() => {
            setOpenUpdateContacts(false);
          }}
          setAction={setAction}
        />
      )}
    </Card>
  );
};

export default FamiliesTable;
