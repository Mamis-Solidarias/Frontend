import React, {FC} from 'react';

// ** MUI Imports
import MenuItem from '@mui/material/MenuItem';
import Community from 'src/types/Community';
import TextField from '@mui/material/TextField';

import {BeneficiariesFilters} from 'src/types/BeneficiariesFilters';
import {Card, Grid} from "@mui/material";
import Button from "@mui/material/Button";

interface FamiliesFiltersViewProps {
    communities: Community[];
    filters: BeneficiariesFilters;
    setFilter: (field: keyof BeneficiariesFilters, value: any) => void;
    onSetFiltersAction: (filter: BeneficiariesFilters) => void;
}

const FamiliesFiltersView: FC<FamiliesFiltersViewProps> = props => {
    const {communities, filters, setFilter, onSetFiltersAction} = props;
    
    // const [openCollapse, setOpenCollapse] = useState<boolean>(false);


    return (
        <Card sx={{display:'flex',justifyContent: 'center', my: '2em', width: '100%', flexDirection: 'column'}}>
            <Grid container alignItems={'center'} justifyContent={'space-around'}columns={{xs:12, sm:14, md:14}}>
                <Grid item display='flex' justifyContent='center' xs={12} sm={3} md={3}>
                    <h2>
                        Filtros
                    </h2>
                </Grid>

                    <Grid item xs={12} sm={3} md={3}>
                        <TextField
                            select
                            fullWidth={true}
                            variant='standard'
                            label='Comunidad'
                            value={filters.communityCode}
                            onChange={e => setFilter('communityCode', e.target.value)}
                        >
                            <MenuItem value=''>Todas</MenuItem>
                            {communities.map(community => (
                                <MenuItem value={community.id} key={community.id}>
                                    {community.id + ' - ' + community.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={3} md={3}>
                        <TextField
                            fullWidth={true}
                            variant='standard'
                            label='Nombre de Familia'
                            value={filters.familyName}
                            onChange={e => setFilter('familyName', e.target.value)}
                        />
                    </Grid>

                <Grid item display='flex' justifyContent='center' xs={12} md={3} lg={3}>
                    <Button
                        variant='contained'
                        onClick={() => {
                            const filtersToApply = filters;
                            for (const fk in filtersToApply) {
                                if (!filtersToApply[fk as keyof BeneficiariesFilters]) {
                                    filtersToApply[fk as keyof BeneficiariesFilters] = null;
                                }
                            }
                            onSetFiltersAction(filtersToApply);
                        }}
                    >
                        Aplicar Filtros
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default FamiliesFiltersView;
