import Box from "@mui/material/Box";
import InfoIcon from "@mui/icons-material/Info";
import {DefaultCard} from "src/views/beneficiaries/BeneficiaryCard/DefaultCard";
import {AbrigaditosEdition} from "src/types/campaigns/AbrigaditosEdition";

interface AbrigaditosBriefInformation {
  abrigaditosEdition: AbrigaditosEdition
}

export default (props: AbrigaditosBriefInformation) => {
  const {abrigaditosEdition} = props;

  return <Box alignItems={"center"}>
    <DefaultCard sx={{display: 'flex', flexDirection: 'column'}}
                 title={<InfoIcon sx={{color: '#00a5ff'}}/>} fields={{
      Proveedor: abrigaditosEdition.provider,
      Edición: abrigaditosEdition.edition
    }}/>
  </Box>
}
