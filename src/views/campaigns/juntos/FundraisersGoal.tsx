import React from 'react';

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
      <LinearProgress value={dataEdition.fundraiserGoal}/>
    </Box>
  );
};
