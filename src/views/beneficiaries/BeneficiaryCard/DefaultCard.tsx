import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

interface DefaultCardProps {
  sx: any;
  title: string;
  fields: any;
}

export const DefaultCard: FC<DefaultCardProps> = props => {
  const { title, fields, sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title={title} titleTypographyProps={{ sx: { letterSpacing: '0.15px !important' } }} />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.0)} !important` }}>
        {Object.keys(fields).map(key => (
          <Box
            key={key}
            sx={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'column',
              alignItems: 'start'
            }}
          >
            <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                {key}:
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant='body2' sx={{ color: 'text.primary' }}>
                {fields[key]}
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};
