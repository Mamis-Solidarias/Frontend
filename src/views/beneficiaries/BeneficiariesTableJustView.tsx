import React, { useState, FC } from 'react';

// ** MUI Imports
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import Beneficiary from 'src/types/Beneficiary';
import DisplayBeneficiary from './DisplayBeneficiary';

interface BeneficiariesTableProps {
  beneficiaries: Beneficiary[];
}

const BeneficiariesTable: FC<BeneficiariesTableProps> = props => {
  const { beneficiaries } = props;
  const [open, setOpen] = useState<boolean[]>([]);

  return (
    <>
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
            {!!beneficiaries &&
              beneficiaries.map((row: Beneficiary, index: number) => (
                <DisplayBeneficiary
                  key={index}
                  index={index}
                  benef={row}
                  open={open}
                  setOpen={setOpen}
                  benefsQ={beneficiaries.length}
                ></DisplayBeneficiary>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BeneficiariesTable;
