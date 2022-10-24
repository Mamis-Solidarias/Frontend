import React, { FC } from 'react';
import { DefaultCard } from './DefaultCard';

export const JobCard: FC<{ job: any; sx?: any }> = props => {
  const { job, sx } = props;

  return <DefaultCard title='Trabajo' fields={{ 'Título:': job.title }} sx={sx} />;
};
