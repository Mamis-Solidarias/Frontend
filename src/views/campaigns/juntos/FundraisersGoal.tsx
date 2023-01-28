import React from 'react';

import Box from "@mui/material/Box";
import {LinearProgress} from "@mui/material";
import {JuntosEdition} from "src/types/campaigns/JuntosEdition";
import {DefaultCard} from "src/views/beneficiaries/BeneficiaryCard/DefaultCard";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

interface JuntosEditionProps {
  dataEdition: JuntosEdition;
}

export default (props: JuntosEditionProps) => {
  const {dataEdition} = props;

  return (
    <Box>
      <DefaultCard sx={{display: 'flex', flexDirection: 'column', minWidth: '5em'}} title={<LocalAtmIcon sx={{color: '#85bb65'}}/>} fields={{'Objetivo de la edicion': '$' + dataEdition.fundraiserGoal, 'Recaudado': '$5'}}/>
    </Box>
  );
};
