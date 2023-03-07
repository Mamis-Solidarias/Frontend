import InfoIcon from "@mui/icons-material/Info";
import {DefaultCard} from "src/views/beneficiaries/BeneficiaryCard/DefaultCard";
import {AbrigaditosEdition} from "src/types/campaigns/AbrigaditosEdition";

interface AbrigaditosBriefInformation {
  abrigaditosEdition: AbrigaditosEdition
}

export default (props: AbrigaditosBriefInformation) => {
  const {abrigaditosEdition} = props;

  return <>
    <DefaultCard sx={{display: 'flex', flexDirection: 'column', mx: " .125em"}}
                 title={<InfoIcon sx={{color: '#00a5ff'}}/>} fields={{
      Proveedor: !!abrigaditosEdition.provider ? abrigaditosEdition.provider : '-',
      Objetivo: '$' + abrigaditosEdition.fundraiserGoal
    }}/>
    <DefaultCard sx={{display: 'flex', flexDirection: 'column', mx: " .125em"}}
                 title={<InfoIcon sx={{color: '#00a5ff'}}/>} fields={{
      Recaudado: abrigaditosEdition.totalDonations + '$',
      Completitud: (abrigaditosEdition.totalDonations*100/abrigaditosEdition.fundraiserGoal).toFixed(2) + '%',
    }}/>
  </>
}
