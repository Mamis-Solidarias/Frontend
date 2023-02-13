import React from 'react';

import Box from "@mui/material/Box";
import {DefaultCard} from "src/views/beneficiaries/BeneficiaryCard/DefaultCard";
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import {AbrigaditosEdition} from "src/types/campaigns/AbrigaditosEdition";

interface AbrigaditosEditionProps {
  dataEdition: AbrigaditosEdition;
}

export default (props: AbrigaditosEditionProps) => {
  const {dataEdition} = props;

  return (
    <Box>
      <DefaultCard sx={{display: 'flex', flexDirection: 'column', minWidth: '5em'}} title={<LocalAtmIcon sx={{color: '#85bb65'}}/>} fields={{'Objetivo de la edicion': '$' + dataEdition.fundraiserGoal, 'Recaudado': '$5'}}/>
    </Box>
  );
};
