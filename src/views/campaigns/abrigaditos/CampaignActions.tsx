import Button from "@mui/material/Button";
import {updateOpenCreateAbrigaditos, updateOpenEditAbrigaditos} from "src/features/campaigns/abrigaditosSlice";
import {useAppDispatch} from "src/hooks/reduxHooks";

interface CampaignActionsProps {
  dataEdition: any;
}

export default (props: CampaignActionsProps) => {
  const { dataEdition } = props;
  const dispatch = useAppDispatch();

  return <>
    <Button sx={{mx: '.25em'}}
            variant='contained'
            onClick={() => dispatch(updateOpenEditAbrigaditos(true))}
            disabled={!dataEdition?.abrigaditosCampaign}
    >
      Editar
    </Button>
    <Button sx={{mx: '.25em'}}
            variant='contained'
            onClick={() => dispatch(updateOpenCreateAbrigaditos(true))}
    >
      Crear
    </Button>
  </>
}
