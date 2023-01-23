import React, {FC} from 'react';
import SchoolIcon from '@mui/icons-material/School';
import {SCHOOL_YEARS} from 'src/types/beneficiaries/SchoolYear';
import {DefaultCard} from './DefaultCard';

export const EducationCard: FC<{ education: any; sx?: any }> = props => {
  const {education, sx} = props;
  const TRANSPORT_METHODS = {
    BIKE: 'Bicicleta',
    CAR: 'Auto',
    HORSE: 'Caballo',
    PUBLIC_TRANSPORT: 'Transporte Público',
    WALKING: 'Caminando',
    OTHER: 'Otros'
  };

  return (
    <DefaultCard
      title={<SchoolIcon sx={{color: '#7291F9'}}/>}
      fields={{
        Institución: !!education.school ? education.school : 'Falta Información',
        'Año académico': !!education.year
          ? SCHOOL_YEARS[education.year as keyof typeof SCHOOL_YEARS]
          : 'Falta Información',
        'Método de Transporte': !!education.transportationMethod
          ? TRANSPORT_METHODS[education.transportationMethod as keyof typeof TRANSPORT_METHODS]
          : 'Falta Información'
      }}
      sx={sx}
    />
  );
};
