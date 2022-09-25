import React, { useState } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import { GetBeneficiaries } from './GetBeneficiaries';

const BeneficiariesTable = () => {
  const [open, setOpen] = useState<boolean[]>([]);

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
              <GetBeneficiaries open={open} setOpen={setOpen} />
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default BeneficiariesTable;
