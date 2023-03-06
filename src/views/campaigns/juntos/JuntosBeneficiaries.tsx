import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from "@mui/material/Card";
import {JuntosEdition, Participant} from "src/types/campaigns/JuntosEdition";
import GENDERS from "src/types/beneficiaries/Genders";

interface JuntosEditionProps {
  dataEdition: JuntosEdition;
}

export default (props: JuntosEditionProps) => {
  const {dataEdition} = props;

  return (
    <Card>
      <TableContainer>
        <Table sx={{minWidth: 800}} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Género</TableCell>
              <TableCell>Talle Calzado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataEdition?.participants?.map((participant: Participant) => (
              <TableRow key={participant.beneficiaryId}>
                <TableCell>{participant.beneficiaryName}</TableCell>
                <TableCell>{GENDERS[participant.beneficiaryGender as keyof typeof GENDERS]}</TableCell>
                <TableCell>{participant.shoeSize}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
