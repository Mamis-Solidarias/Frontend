import Box from "@mui/material/Box";
import {DefaultCard} from "src/views/beneficiaries/BeneficiaryCard/DefaultCard";
import {JuntosEdition} from "src/types/campaigns/JuntosEdition";

interface JuntosBriefInformation {
  juntosEdition: JuntosEdition
}

export default (props: JuntosBriefInformation) => {
  const {juntosEdition} = props;

  return <Box alignItems={"center"}>
    <DefaultCard sx={{display: 'flex', flexDirection: 'column'}}
                 title={"Descripción"} fields={{
      Proveedor: juntosEdition.provider,
      Edición: juntosEdition.edition
    }}/>
  </Box>
}
