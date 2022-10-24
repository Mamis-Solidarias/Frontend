import React, { FC } from 'react';
import { DefaultCard } from './DefaultCard';

export const LikesCard: FC<{ likes: string; sx?: any }> = props => {
  const { likes, sx } = props;

  return <DefaultCard title='Qué le Gusta' fields={{ 'Qué le Gusta': likes }} sx={sx} />;
};
