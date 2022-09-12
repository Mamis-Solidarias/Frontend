import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

export const Health: FC<{ health: any; sx?: any }> = props => {
  const { health, sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title='Salud' titleTypographyProps={{ sx: { letterSpacing: '0.15px !important' } }} />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.0)} !important` }}>
        <Box
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
              ¿Tiene Vacuna COVID?:
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {health.hasCovidVaccine ? 'Sí' : 'No'}
            </Typography>
          </Box>
        </Box>
        <Box
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
              ¿Tiene Vacunas Mandatorias?:
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {health.hasMandatoryVaccines ? 'Sí' : 'No'}
            </Typography>
          </Box>
        </Box>
        <Box
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
              Observaciones:
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {health.observations}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
