import React, { FC } from 'react';
import { DefaultCard } from './DefaultCard';
import CommentIcon from '@mui/icons-material/Comment';

export const CommentsCard: FC<{ comments: string; sx?: any }> = props => {
  const { comments, sx } = props;

  return <DefaultCard title={<CommentIcon sx={{ color: '#4b5da1' }} />} fields={{ Comentarios: comments }} sx={sx} />;
};
