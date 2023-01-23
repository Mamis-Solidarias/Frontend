import Box from "@mui/material/Box";
import {JuntosEdition} from "src/types/campaigns/JuntosEdition";
import {DefaultCard} from "src/views/beneficiaries/BeneficiaryCard/DefaultCard";
import InfoIcon from "@mui/icons-material/Info";

interface JuntosBriefInformation {
  juntosEdition: JuntosEdition
}

export default (props: JuntosBriefInformation) => {
  const {juntosEdition} = props;

  return <Box alignItems={"center"}>
    <DefaultCard sx={{display: 'flex', flexDirection: 'column'}}
                 title={<InfoIcon sx={{color: '#00a5ff'}}/>} fields={{
      Proveedor: juntosEdition.provider,
      Edición: juntosEdition.edition
    }}/>
  </Box>
}
