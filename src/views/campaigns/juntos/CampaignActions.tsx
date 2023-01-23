import Button from "@mui/material/Button";
import {updateOpenCreateJuntos, updateOpenEditJuntos} from "../../../features/campaigns/juntosSlice";
import {useAppDispatch} from "../../../hooks/reduxHooks";

interface CampaignActionsProps {
  dataEdition: any;
}

export default (props: CampaignActionsProps) => {
  const { dataEdition } = props;
  const dispatch = useAppDispatch();

  return <>
    <Button sx={{mx: '.25em'}}
            variant='contained'
            onClick={() => dispatch(updateOpenEditJuntos(true))}
            disabled={!dataEdition || dataEdition.length === 0}
    >
      Editar
    </Button>
    <Button sx={{mx: '.25em'}}
            variant='contained'
            onClick={() => dispatch(updateOpenCreateJuntos(true))}
    >
      Crear
    </Button>
  </>
}
