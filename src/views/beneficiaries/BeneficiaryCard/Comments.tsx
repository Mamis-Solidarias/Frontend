import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

export const CommentsCard: FC<{ comments: string; sx?: any }> = props => {
  const { comments, sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title='Comentarios' titleTypographyProps={{ sx: { letterSpacing: '0.15px !important' } }} />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.0)} !important` }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {comments}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
