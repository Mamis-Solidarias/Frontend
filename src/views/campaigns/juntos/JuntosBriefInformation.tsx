import { JuntosEdition } from 'src/types/campaigns/JuntosEdition';
import { DefaultCard } from 'src/views/beneficiaries/BeneficiaryCard/DefaultCard';
import InfoIcon from '@mui/icons-material/Info';

interface JuntosBriefInformation {
  juntosEdition: JuntosEdition;
}

export default (props: JuntosBriefInformation) => {
  const { juntosEdition } = props;

  return (
    <>
      <DefaultCard
        sx={{ display: 'flex', flexDirection: 'column', mx: ' .125em' }}
        title={<InfoIcon sx={{ color: '#00a5ff' }} />}
        fields={{
          Proveedor: !!juntosEdition.provider ? juntosEdition.provider : '-',
          Objetivo: '$' + juntosEdition.fundraiserGoal
        }}
      />
      <DefaultCard
        sx={{ display: 'flex', flexDirection: 'column', mx: ' .125em' }}
        title={<InfoIcon sx={{ color: '#00a5ff' }} />}
        fields={{
          Recaudado: juntosEdition.totalDonations + '$',
          Completitud: ((juntosEdition.totalDonations * 100) / juntosEdition.fundraiserGoal).toFixed(2) + '%'
        }}
      />
    </>
  );
};
