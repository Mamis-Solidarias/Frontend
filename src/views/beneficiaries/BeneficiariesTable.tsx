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
import { useQuery } from '@apollo/client';
import Beneficiary from 'src/types/Beneficiary';
import { GET_BENEFICIARIES } from 'src/API/Beneficiaries/beneficiaries_grapql';
import DisplayBeneficiary from './DisplayBeneficiary';
import Button from '@mui/material/Button';
import BeneficiaryTablePagination from './BeneficiaryTablePagination';
import { deleteBeneficiary } from 'src/API/Beneficiaries/beneficiaries_data';
import { activateBeneficiary } from './../../API/Beneficiaries/beneficiaries_data';
import { BeneficiaryEditForm } from './BeneficiaryEditForm';
import Community from 'src/types/Community';

interface BeneficiariesTableProps {
  filters: BeneficiariesFilters;
  communities: Community[];
}

const BeneficiariesTable: FC<BeneficiariesTableProps> = props => {
  const [open, setOpen] = useState<boolean[]>([]);
  const [openEditBeneficiary, setOpenEditBeneficiary] = useState<boolean>(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | undefined>();
  const { filters, communities } = props;
  const { paging, setBeneficiariesPaging } = useBeneficiariesPaging();
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
      isActive: !!filters.isActive ? (filters.isActive === 'true' ? true : false) : null,
      after: paging.pageCursor,
      limit: paging.limit
    }
  });

  const refetchWithSameParameters = () => {
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
  };

  useEffect(() => {
    refetchWithSameParameters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.pageCursor, filters, paging.limit]);

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
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nodes.map((row: Beneficiary, index: number) => (
                <DisplayBeneficiary
                  key={index}
                  index={index}
                  benef={row}
                  open={open}
                  setOpen={setOpen}
                  benefsQ={nodes.length}
                >
                  <TableCell sx={{ display: 'flex', flexDirection: 'column' }}>
                    {row.isActive && (
                      <Button
                        variant='contained'
                        sx={{ my: '.5em' }}
                        onClick={() =>
                          deleteBeneficiary(row.id ? row.id : '-1').then(() => refetchWithSameParameters())
                        }
                      >
                        Desactivar
                      </Button>
                    )}
                    {!row.isActive && (
                      <Button
                        variant='contained'
                        sx={{ my: '.5em' }}
                        onClick={() =>
                          activateBeneficiary(row.id ? row.id : '-1').then(() => refetchWithSameParameters())
                        }
                      >
                        Activar
                      </Button>
                    )}
                    {row.isActive && (
                      <Button
                        variant='contained'
                        sx={{ my: '.5em' }}
                        onClick={() => {
                          setSelectedBeneficiary(row);
                          setOpenEditBeneficiary(true);
                        }}
                      >
                        Editar
                      </Button>
                    )}
                  </TableCell>
                </DisplayBeneficiary>
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
        {openEditBeneficiary && !!selectedBeneficiary && (
          <BeneficiaryEditForm
            openDialog={openEditBeneficiary}
            handleClose={() => setOpenEditBeneficiary(false)}
            communities={communities}
            action='Editar'
            beneficiary={selectedBeneficiary}
          />
        )}
      </Card>
    </>
  );
};

export default BeneficiariesTable;
