import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import {LinearProgress} from "@mui/material";
import {JuntosEdition} from "src/types/campaigns/JuntosEdition";

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
              <TableCell></TableCell>
              <TableCell>Familia</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Ciclo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*{dataEdition.beneficiaries.map((participant) => (*/}
            {/*  <TableRow key={participant.id}>*/}
            {/*    <TableCell></TableCell>*/}
            {/*    <TableCell>{participant.beneficiary?.familyId}</TableCell>*/}
            {/*    <TableCell>{participant.beneficiaryName}</TableCell>*/}
            {/*    <TableCell>*/}
            {/*      {!!participant.schoolCycle*/}
            {/*        ? SCHOOL_CYCLES[participant.schoolCycle as keyof typeof SCHOOL_CYCLES]*/}
            {/*        : '-'}*/}
            {/*    </TableCell>*/}
            {/*  </TableRow>*/}
            {/*))}*/}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        <LinearProgress value={dataEdition.fundraiserGoal}/>
      </Box>
    </Box>
  );
};
