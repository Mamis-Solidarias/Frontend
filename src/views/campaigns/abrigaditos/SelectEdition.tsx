import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {useAppDispatch, useAppSelector} from "src/hooks/reduxHooks";
import {updateFiltersApplied, updateFiltersToApply} from "src/features/campaigns/juntosSlice";
import {Action} from "src/types/Action";
import {useEffect, useState} from "react";
import Community from "src/types/beneficiaries/Community";
import {userIsLoggedIn} from "src/utils/sessionManagement";
import {getCommunities} from "src/API/Beneficiaries/communities_data";

interface SelectEditionProps {
  setAction: (action: Action) => void;
  refetchEditions: (filters: {communityId: string}) => void;
  editions: { edition: string }[];
}

export default (props: SelectEditionProps) => {
  const {setAction, refetchEditions, editions} = props;
  const dispatch = useAppDispatch();
  const abrigaditosSelector = useAppSelector(state => state.abrigaditos);
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    if (userIsLoggedIn()) {
      getCommunities().then(result => {
        setCommunities(result.data.communities);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Box alignItems={'center'}>
    <Card
      sx={{display: 'flex', flexDirection: 'column', px: '.25em', py: '.25em'}}>
      <CardHeader title={"Seleccionar Campaña"} action={<Button onClick={
        () => {
          dispatch(updateFiltersApplied(abrigaditosSelector.filtersToApply));
          setAction({
            complete: true,
            success: true,
            message: 'Campaña Seleccionada',
            status: 200
          });
        }
      }
      >
        Aplicar cambios
      </Button>}/>
      <CardContent sx={{flexDirection: 'row'}}>
        <TextField
          select
          sx={{mx: '.25em'}}
          variant='standard'
          type='text'
          label='Comunidad'
          value={abrigaditosSelector.filtersToApply.community}
          onChange={e => {
            dispatch(updateFiltersToApply( {...abrigaditosSelector.filtersToApply, ...{community: e.target.value}}));
            refetchEditions({communityId: e.target.value});
          }}>
          { communities.map(community => {
            return (
              <MenuItem value={community.id} key={community.id}>
                {community.id + ' - ' + community.name}
              </MenuItem>
            );
          })}
        </TextField>
        <TextField
          select
          sx={{mx: '.25em'}}
          variant='standard'
          type='text'
          label='Edición'
          value={abrigaditosSelector.filtersToApply.edition}
          onChange={e => dispatch(updateFiltersToApply({...abrigaditosSelector.filtersToApply, ...{edition: e.target.value}}))}
        >
          {editions.map((editionJson) => {
            return (
              <MenuItem value={editionJson.edition} key={editionJson.edition}>
                {editionJson.edition}
              </MenuItem>
            );
          })}
        </TextField>
      </CardContent>
    </Card>
  </Box>;
}
