import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Portal from '@mui/material/Portal';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import {useAction} from 'src/hooks/actionHook';
import {hasWriteAccess, userIsLoggedIn} from 'src/utils/sessionManagement';
import CommunitiesTable from 'src/views/communities/ComunitiesTable';

// ** Demo Components Imports
import {CreateCommunity} from 'src/views/communities/CreateCommunity';
import ActionToast from 'src/views/pages/misc/ActionToast';

const Dashboard = () => {
    const [openCreateCommunities, setOpenCreateCommunities] = useState<boolean>(false);
    const [openWindow, setOpenWindow] = useState<boolean>(false);
    const [hasWriteBenefs, setHasWriteBenefs] = useState<boolean>(false);
    const {action, setAction, setCompletion} = useAction();

    useEffect(() => {
        setHasWriteBenefs(hasWriteAccess('Beneficiaries'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (openWindow && openCreateCommunities === false) {
            setOpenWindow(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openCreateCommunities]);

    return (
        <ApexChartWrapper>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <CommunitiesTable
                        openCreateCommunities={openCreateCommunities}
                        openWindow={openWindow}
                        setAction={setAction}
                    >
                        {hasWriteBenefs && (
                            <Button
                                variant='contained'
                                onClick={() => {
                                    setOpenWindow(true);
                                    setOpenCreateCommunities(true);
                                }}
                            >
                                Añadir Comunidades
                            </Button>
                        )}
                    </CommunitiesTable>

                    {openCreateCommunities && (
                        <CreateCommunity
                            openDialog={openCreateCommunities}
                            handleClose={() => setOpenCreateCommunities(false)}
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
