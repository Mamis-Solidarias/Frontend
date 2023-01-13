import React, {FC} from 'react';

// ** MUI Imports
import TextField from '@mui/material/TextField';

import {Grid, Switch} from "@mui/material";
import Button from "@mui/material/Button";
import {DonorsFilters} from "../../types/DonorsFilters";
import FormControlLabel from "@mui/material/FormControlLabel";

interface FamiliesFiltersViewProps {
  filters: DonorsFilters;
  setFilter: (field: keyof DonorsFilters, value: any) => void;
  onSetFiltersAction: (filter: DonorsFilters) => void;
}

const DonorsFilterView: FC<FamiliesFiltersViewProps> = props => {
  const {filters, setFilter, onSetFiltersAction} = props;

  // const [openCollapse, setOpenCollapse] = useState<boolean>(false);


  return (
      <Grid container alignItems={'center'} justifyContent={'space-around'}columns={{xs:12, sm:14, md:14}}>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            fullWidth={true}
            variant='standard'
            label='Nombre'
            value={filters.name}
            onChange={e => setFilter('name', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            fullWidth={true}
            variant='standard'
            label='Id del Creador'
            type={"number"}
            value={filters.ownerId}
            onChange={e => setFilter('ownerId', parseInt(e.target.value))}
          />
        </Grid>
        <Grid item display='flex' xs={2} sm={3} md={4}>
          <FormControlLabel
            sx={{ margin: 'auto' }}
            control={
              <Switch
                defaultChecked
                onChange={e => setFilter('isGodFather', e.target.checked)}
                checked={filters.isGodFather}
              />
            }
            label='Es padrino'
          />
        </Grid>
        <Grid item display='flex' justifyContent='center' xs={12} md={3} lg={3}>
          <Button
            variant='contained'
            onClick={() => {
              console.log(filters)
              onSetFiltersAction(filters);
            }}
          >
            Aplicar Filtros
          </Button>
        </Grid>
      </Grid>
  );
};

export default DonorsFilterView;
