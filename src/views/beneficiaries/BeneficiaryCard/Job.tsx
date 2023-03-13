import React, { FC } from 'react';
import { DefaultCard } from './DefaultCard';
import WorkIcon from '@mui/icons-material/Work';

export const JobCard: FC<{ job: any; sx?: any }> = props => {
  const { job, sx } = props;

  return <DefaultCard title={<WorkIcon sx={{ color: '#808080' }} />} fields={{ 'Título:': job.title }} sx={sx} />;
};
