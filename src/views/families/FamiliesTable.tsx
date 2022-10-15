import { FC } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
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
import Contact from 'src/types/Contact';
import Family from 'src/types/Family';
import { BeneficiariesFilters } from 'src/types/BeneficiariesFilters';
import Community from 'src/types/Community';
import { GET_FAMILIES } from 'src/API/Beneficiaries/beneficiaries_grapql';
import { useBeneficiariesPaging } from 'src/hooks/beneficiaries/useBeneficiariesPaging';
import { useQuery } from '@apollo/client';
import BeneficiaryTablePagination from '../beneficiaries/BeneficiaryTablePagination';

interface FamiliesTableProps {
  communities: Community[];
  filters: BeneficiariesFilters;
  openCreateFamilies: boolean;
}

const FamiliesTable: FC<FamiliesTableProps> = props => {
  const { filters, openCreateFamilies } = props;
  const [open, setOpen] = useState<boolean[]>([]);
  const [id, setId] = useState<number>(-1);
  const [openUpdateFamily, setOpenUpdateFamily] = useState<boolean>(false);
  const [openUpdateContacts, setOpenUpdateContacts] = useState<boolean>(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { paging, setBeneficiariesPaging } = useBeneficiariesPaging();
  const { loading, error, data, refetch } = useQuery(GET_FAMILIES, {
    variables: {
      communityCode: filters.communityCode,
      familyName: filters.familyName
    }
  });

  const refetchWithSameParameters = () => {
    refetch({
      communityCode: filters.communityCode,
      familyName: filters.familyName
    });
  };

  useEffect(() => {
    if (!!localStorage.getItem('user') && !openUpdateFamily && !openUpdateContacts && !openCreateFamilies) {
      refetchWithSameParameters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openUpdateContacts, openUpdateFamily, openCreateFamilies]);

  if (loading)
    return (
      <TableRow>
        <TableCell>Cargando...</TableCell>
      </TableRow>
    );

  if (error) {
    return (
      <TableRow>
        <TableCell>Error :(</TableCell>
      </TableRow>
    );
  }

  const nodes = data.families.nodes;
  const pageInfo = data.families.pageInfo;
  const edges = data.families.edges;

  return (
    <>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Detalles</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nodes.map((row: Family, index: number) => (
                <>
                  <TableRow hover key={index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
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
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell>{row.details}</TableCell>
                  </TableRow>
                  <TableRow key={'expanded' + index} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell colSpan={12}>
                      <Collapse in={open[index]} timeout='auto' unmountOnExit>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                          <TableCell>
                            <Button
                              variant='contained'
                              onClick={() => {
                                setId(row.id as number);
                                setOpenUpdateFamily(true);
                              }}
                            >
                              Editar Datos
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant='contained'
                              onClick={() => {
                                setId(row.id as number);
                                setContacts(row.contacts);
                                setOpenUpdateContacts(true);
                              }}
                            >
                              Editar Contactos
                            </Button>
                          </TableCell>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <BeneficiaryTablePagination
          paging={paging}
          setBeneficiariesPaging={setBeneficiariesPaging}
          pageInfo={pageInfo}
          nodes={nodes}
          edges={edges}
        />
        {openUpdateFamily && (
          <UpdateFamily
            openDialog={openUpdateFamily}
            id={id}
            handleClose={() => {
              setOpenUpdateFamily(false);
            }}
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
          />
        )}
      </Card>
    </>
  );
};

export default FamiliesTable;
