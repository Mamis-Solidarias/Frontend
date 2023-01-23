import React, { FC } from 'react';
import { DefaultCard } from './DefaultCard';
import CheckroomIcon from '@mui/icons-material/Checkroom';

export const ClothesCard: FC<{ clothes: any; sx?: any }> = props => {
  const { clothes, sx } = props;

  return (
    <DefaultCard
      title={<CheckroomIcon sx={{color: '#62b4a5'}}/>}
      fields={{
        'Talle de Calzado': !!clothes.shoeSize ? clothes.shoeSize : 'Falta Información',
        'Talle de Pantalones': !!clothes.pantsSize ? clothes.pantsSize : 'Falta Información',
        'Talle de Remera': !!clothes.shirtSize ? clothes.shirtSize : 'Falta Información'
      }}
      sx={sx}
    />
  );
};
