import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import {JuntosEdition, Participant} from "src/types/campaigns/JuntosEdition";

interface JuntosEditionProps {
  dataEdition: JuntosEdition;
}

export default (props: JuntosEditionProps) => {
  const {dataEdition} = props;

  return (
    <Box>
      <TableContainer>
        <Table sx={{minWidth: 800}} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Género</TableCell>
              <TableCell>Talle Calzado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataEdition?.participants?.map((participant: Participant) => (
              <TableRow key={participant.beneficiaryId}>
                <TableCell>{participant.beneficiaryId}</TableCell>
                <TableCell>{participant.beneficiaryName}</TableCell>
                <TableCell>{participant.beneficiaryGender}</TableCell>
                <TableCell>{participant.shoeSize}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
