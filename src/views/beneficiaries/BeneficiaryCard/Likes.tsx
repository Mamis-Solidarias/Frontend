import React, { FC } from 'react';
import { DefaultCard } from './DefaultCard';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const LikesCard: FC<{ likes: string; sx?: any }> = props => {
  const { likes, sx } = props;

  return <DefaultCard title={<FavoriteIcon sx={{color: '#e60000'}}/>} fields={{ 'Qué le Gusta': likes }} sx={sx} />;
};
