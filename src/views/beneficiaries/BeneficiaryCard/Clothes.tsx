import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

export const ClothesCard: FC<{ clothes: any; sx?: any }> = props => {
  const { clothes, sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title='Ropa' titleTypographyProps={{ sx: { letterSpacing: '0.15px !important' } }} />
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
              Talle de Calzado:
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {clothes.shoeSize}
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
              Talle de Pantalones:
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {clothes.pantsSize}
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
              Talle de Remera:
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {clothes.shirtSize}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
