import React, { FC } from 'react';
import { DefaultCard } from './DefaultCard';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';

export const DetailsCard: FC<{ details: string; sx?: any }> = props => {
  const { details, sx } = props;

  return <DefaultCard title={<MapsUgcIcon sx={{ color: '#4b5da1' }} />} fields={{ Detalles: details }} sx={sx} />;
};
