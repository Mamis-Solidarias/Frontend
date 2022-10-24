import React, { FC } from 'react';
import { DefaultCard } from './DefaultCard';

export const HealthCard: FC<{ health: any; sx?: any }> = props => {
  const { health, sx } = props;

  return (
    <DefaultCard
      title='Salud'
      fields={{
        '¿Tiene Vacuna COVID?': health.hasCovidVaccine
          ? 'Sí'
          : health.hasCovidVaccine === undefined
          ? 'Falta información'
          : 'No',
        '¿Tiene Vacunas Mandatorias?': health.hasMandatoryVaccines
          ? 'Sí'
          : health.hasMandatoryVaccines === undefined
          ? 'Falta información'
          : 'No',
        Observaciones: !!health.observations ? health.observations : 'Falta Información'
      }}
      sx={sx}
    />
  );
};
