import React, { FC } from 'react';
import { DefaultCard } from './DefaultCard';

export const DetailsCard: FC<{ details: string; sx?: any }> = props => {
  const { details, sx } = props;

  return <DefaultCard title='Detalles' fields={{ Detalles: details }} sx={sx} />;
};
