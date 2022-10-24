import React, { FC } from 'react';
import { DefaultCard } from './DefaultCard';

export const CommentsCard: FC<{ comments: string; sx?: any }> = props => {
  const { comments, sx } = props;

  return <DefaultCard title='Comentarios' fields={{ Comentarios: comments }} sx={sx} />;
};
