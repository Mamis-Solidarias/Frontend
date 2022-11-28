import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {useEffect, useState} from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports
import FamiliesTable from 'src/views/families/FamiliesTable';
import {getCommunities} from 'src/API/Beneficiaries/communities_data';
import {CreateFamilies} from 'src/views/families/CreateFamilies';
import Community from 'src/types/Community';
import {BeneficiariesFilters, beneficiariesFiltersNull} from 'src/types/BeneficiariesFilters';
import {useBeneficiariesFilters} from 'src/hooks/beneficiaries/useBeneficiariesFilters';
import FamiliesFiltersView from 'src/views/families/FamiliesFiltersView';
import Portal from '@mui/material/Portal';
import ActionToast from 'src/views/pages/misc/ActionToast';
import {useAction} from 'src/hooks/actionHook';
import {hasWriteAccess, userIsLoggedIn} from 'src/utils/sessionManagement';

const Dashboard = () => {
    const [openCreateFamilies, setOpenCreateFamilies] = useState<boolean>(false);
    const [openWindow, setOpenWindow] = useState<boolean>(false);
    const [communityCode, setCommunityCode] = useState<string>('#');
    const [communities, setCommunities] = useState<Community[]>([]);
    const [hasWriteBenefs, setHasWriteBenefs] = useState<boolean>(false);
    const {filters, setFilter} = useBeneficiariesFilters();
    const {action, setAction, setCompletion} = useAction();
    const [filtersApplied, setFiltersApplied] = useState<BeneficiariesFilters>(beneficiariesFiltersNull);

    useEffect(() => {
        if (userIsLoggedIn()) {
            setHasWriteBenefs(hasWriteAccess('Beneficiaries'));
            getCommunities().then(result => {
                setCommunities(result.data.communities);
                if (result.data.communities.length > 0) {
                    setCommunityCode(result.data.communities[0].id as string);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSetFiltersAction = (filter: BeneficiariesFilters) => {
        setFiltersApplied(filter);
        setAction({
            complete: true,
            success: true,
            status: 200,
            message: 'Filtros aplicados correctamente'
        })
    };

    useEffect(() => {
        if (openWindow && openCreateFamilies === false) {
            setOpenWindow(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openCreateFamilies]);

    return (
        <ApexChartWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <FamiliesFiltersView
                        filters={filters}
                        setFilter={setFilter}
                        communities={communities}
                        onSetFiltersAction={onSetFiltersAction}
                    />
                    <FamiliesTable
                        communities={communities}
                        filters={filtersApplied}
                        openCreateFamilies={openCreateFamilies}
                        setAction={setAction}>
                        {hasWriteBenefs && (
                            <Button
                                variant='contained'
                                onClick={() => {
                                    setOpenWindow(true);
                                    setOpenCreateFamilies(true);
                                }}
                                disabled={!communityCode}
                            >
                                Añadir Familias
                            </Button>
                        )}
                    </FamiliesTable>
                    {!!communityCode && (
                        <CreateFamilies
                            openDialog={openCreateFamilies}
                            handleClose={() => setOpenCreateFamilies(false)}
                            setAction={setAction}
                        />
                    )}
                </Grid>
            </Grid>
            <Portal>
                <ActionToast action={action} setActionCompletion={setCompletion}/>
            </Portal>
        </ApexChartWrapper>
    );
};

export default Dashboard;
