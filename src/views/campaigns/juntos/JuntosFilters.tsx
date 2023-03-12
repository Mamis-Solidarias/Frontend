import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import ChevronUp from 'mdi-material-ui/ChevronUp';
import ChevronDown from 'mdi-material-ui/ChevronDown';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { CampaignsFilters } from 'src/types/campaigns/CampaignsFilters';
import CampaignsFiltersView from '../CampaignsFiltersView';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import { updateFiltersApplied, updateOpenCollapse } from 'src/features/campaigns/juntosSlice';
import { Action } from 'src/types/Action';

export default (props: { setAction: (action: Action) => void }) => {
  const { setAction } = props;
  const dispatch = useAppDispatch();
  const juntosSelector = useAppSelector(state => state.juntos);
  const setFilters = (field: keyof CampaignsFilters, value: any): any =>
    dispatch(updateFiltersApplied({ ...juntosSelector.filtersApplied, ...{ [field]: value } }));
  const applyFilters = () => {
    const filtersToApply = { ...juntosSelector.filtersToApply };
    for (const key of Object.keys(filtersToApply)) {
      if (!filtersToApply[key as keyof CampaignsFilters]) {
        filtersToApply[key as keyof CampaignsFilters] = null;
      }
    }
    dispatch(updateFiltersApplied(filtersToApply));
    setAction({
      complete: true,
      success: true,
      message: 'Filtros aplicados exitosamente',
      status: 200
    });
  };

  return (
    <Card sx={{ my: '2em', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title='Filtros'
        action={
          <IconButton size='small' onClick={() => dispatch(updateOpenCollapse(!juntosSelector.openFiltersCollapse))}>
            {juntosSelector.openFiltersCollapse ? (
              <ChevronUp sx={{ fontSize: '1.875rem' }} />
            ) : (
              <ChevronDown sx={{ fontSize: '1.875rem' }} />
            )}
          </IconButton>
        }
      />
      <CardContent>
        <Collapse in={juntosSelector.openFiltersCollapse}>
          <CampaignsFiltersView filters={juntosSelector.filtersApplied} setFilter={setFilters}>
            <Button variant='contained' onClick={applyFilters}>
              Aplicar Filtros
            </Button>
          </CampaignsFiltersView>
        </Collapse>
      </CardContent>
    </Card>
  );
};
