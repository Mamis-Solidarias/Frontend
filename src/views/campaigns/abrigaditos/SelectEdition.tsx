import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import { Action } from 'src/types/Action';
import { updateFiltersApplied, updateFiltersToApply } from 'src/features/campaigns/abrigaditosSlice';
import { useQuery } from '@apollo/client';
import { GET_COMMUNITIES } from 'src/API/Beneficiaries/beneficiaries_grapql';
import Community from 'src/types/beneficiaries/Community';

interface SelectEditionProps {
  setAction: (action: Action) => void;
  refetchEditions: (filters: { communityId: string }) => void;
  editions: { edition: string }[];
}

export default (props: SelectEditionProps) => {
  const { setAction, refetchEditions, editions } = props;
  const dispatch = useAppDispatch();
  const abrigaditosSelector = useAppSelector(state => state.abrigaditos);
  const { data: dataCommunities } = useQuery(GET_COMMUNITIES);

  const selectCommunity = (e: any) => {
    dispatch(updateFiltersToApply({ ...abrigaditosSelector.filtersToApply, ...{ community: e.target.value } }));
    refetchEditions({ communityId: e.target.value });
  };

  const selectEdition = (e: any) => {
    dispatch(updateFiltersToApply({ ...abrigaditosSelector.filtersToApply, ...{ edition: e.target.value } }));
    dispatch(updateFiltersApplied({ ...abrigaditosSelector.filtersToApply, ...{ edition: e.target.value } }));
    setAction({
      complete: true,
      success: true,
      message: 'Campaña Seleccionada',
      status: 200
    });
  };

  return (
    <Box alignItems={'center'}>
      <Card sx={{ height: '100%', mx: '.125em' }}>
        <CardHeader title={'Seleccionar Campaña'} />
        <CardContent sx={{ flexDirection: 'row' }}>
          <TextField
            select
            sx={{ mx: '.25em' }}
            variant='standard'
            type='text'
            label='Comunidad'
            value={!!abrigaditosSelector.filtersToApply.community ? abrigaditosSelector.filtersToApply.community : ''}
            onChange={selectCommunity}
          >
            {dataCommunities?.communities?.nodes.map((community: Community) => {
              return (
                <MenuItem value={community.id} key={community.id}>
                  {community.id + ' - ' + community.name}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            select
            sx={{ mx: '.25em' }}
            variant='standard'
            type='text'
            label='Edición'
            value={abrigaditosSelector.filtersToApply.edition}
            onChange={selectEdition}
          >
            {editions.map(editionJson => {
              return (
                <MenuItem value={editionJson.edition} key={editionJson.edition}>
                  {editionJson.edition}
                </MenuItem>
              );
            })}
          </TextField>
        </CardContent>
      </Card>
    </Box>
  );
};
