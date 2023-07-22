import React, { FC } from 'react';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { DefaultCard } from './DefaultCard';

export const HealthCard: FC<{ health: any; sx?: any }> = props => {
  const { health, sx } = props;

  return (
    <DefaultCard
      title={<LocalHospitalIcon sx={{ color: '#ed1b24' }} />}
      fields={{
        '¿Tiene Vacuna COVID?': health.hasCovidVaccine
          ? 'Sí'
          : health.hasCovidVaccine === undefined
          ? '-'
          : 'No',
        '¿Tiene Vacunas Mandatorias?': health.hasMandatoryVaccines
          ? 'Sí'
          : health.hasMandatoryVaccines === undefined
          ? '-'
          : 'No',
        Observaciones: !!health.observations ? health.observations : '-'
      }}
      sx={sx}
    />
  );
};
