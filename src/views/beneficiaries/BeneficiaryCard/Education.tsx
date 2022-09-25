import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

export const EducationCard: FC<{ education: any; sx?: any }> = props => {
  const { education, sx } = props;
  const TRANSPORT_METHODS = {
    BIKE: 'Bicicleta',
    CAR: 'Auto',
    HORSE: 'Caballo',
    PUBLIC_TRANSPORT: 'Transporte Público',
    WALKING: 'Caminando',
    OTHER: 'Otros'
  };

  return (
    <Card sx={sx}>
      <CardHeader title='Educación' titleTypographyProps={{ sx: { letterSpacing: '0.15px !important' } }} />
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
              Institución:
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {education.school}
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
              Año académico:
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {education.year}
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
              Método de Transporte:
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {TRANSPORT_METHODS[education.transportationMethod as keyof typeof TRANSPORT_METHODS]}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
