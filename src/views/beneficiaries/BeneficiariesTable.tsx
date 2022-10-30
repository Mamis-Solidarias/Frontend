import React, {useState, FC, useEffect} from 'react';

// ** MUI Imports
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import {BeneficiariesFilters} from 'src/types/BeneficiariesFilters';
import {useBeneficiariesPaging} from 'src/hooks/beneficiaries/useBeneficiariesPaging';
import {useQuery} from '@apollo/client';
import Beneficiary from 'src/types/Beneficiary';
import {GET_BENEFICIARIES} from 'src/API/Beneficiaries/beneficiaries_grapql';
import DisplayBeneficiary from './DisplayBeneficiary';
import Button from '@mui/material/Button';
import BeneficiaryTablePagination from './BeneficiaryTablePagination';
import {deleteBeneficiary} from 'src/API/Beneficiaries/beneficiaries_data';
import {activateBeneficiary} from './../../API/Beneficiaries/beneficiaries_data';
import {BeneficiaryEditForm} from './BeneficiaryEditForm';
import Community from 'src/types/Community';
import {useRouter} from 'next/router';
import {Action} from 'src/types/Action';
import Box from '@mui/material/Box';
import {hasWriteAccess, userIsLoggedIn} from 'src/utils/sessionManagement';
import {LinearProgress, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

interface BeneficiariesTableProps {
    filters: BeneficiariesFilters;
    communities: Community[];
    openCreateBeneficiaries: boolean;
    openWindow: boolean;
    setAction: (action: Action) => void;
}


const BeneficiariesTable: FC<BeneficiariesTableProps> = props => {
    const {filters, communities, openCreateBeneficiaries, openWindow, setAction} = props;
    const router = useRouter();
    const [open, setOpen] = useState<boolean[]>([]);
    const [openEditBeneficiary, setOpenEditBeneficiary] = useState<boolean>(false);
    const [beneficiaryEdited, setBeneficiaryEdited] = useState<boolean>(false);
    const [selectedBeneficiary, setSelectedBeneficiary] = useState<Beneficiary | undefined>();
    const {paging, setBeneficiariesPaging} = useBeneficiariesPaging();
    const [hasWriteBenefs, setHasWriteBenefs] = useState<boolean>(false);
    const {loading, error, data, refetch} = useQuery(GET_BENEFICIARIES, {
        variables: {
            ageStart: isNaN(parseInt(filters.ageStart as string)) ? filters.ageStart : parseInt(filters.ageStart as string),
            ageEnd: isNaN(parseInt(filters.ageEnd as string)) ? filters.ageEnd : parseInt(filters.ageEnd as string),
            firstName: filters.firstName,
            lastName: filters.lastName,
            type: filters.type,
            dniStarts: filters.dniStarts,
            familyId: filters.familyId,
            communityId: filters.communityCode,
            school: filters.school,
            gender: filters.gender,
            isActive: !!filters.isActive ? (filters.isActive === 'true' ? true : false) : null,
            after: paging.pageCursor,
            limit: paging.limit
        }
    });

    const refetchWithSameParameters = () => {
        refetch({
            ageStart: isNaN(parseInt(filters.ageStart as string)) ? filters.ageStart : parseInt(filters.ageStart as string),
            ageEnd: isNaN(parseInt(filters.ageEnd as string)) ? filters.ageEnd : parseInt(filters.ageEnd as string),
            lastName: filters.lastName,
            firstName: filters.firstName,
            type: filters.type,
            dniStarts: filters.dniStarts,
            familyId: filters.familyId,
            communityId: filters.communityCode,
            school: filters.school,
            gender: filters.gender,
            isActive: !!filters.isActive ? (filters.isActive === 'true' ? true : false) : null,
            after: paging.pageCursor,
            limit: paging.limit
        });
    };

    useEffect(() => {
        if (openWindow && !openCreateBeneficiaries) {
            refetchWithSameParameters();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openCreateBeneficiaries]);

    useEffect(() => {
        if (!!openEditBeneficiary && beneficiaryEdited) {
            refetchWithSameParameters();
            setBeneficiaryEdited(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openEditBeneficiary]);

    useEffect(() => {
        if (!userIsLoggedIn()) {
            router.push('/login');
        }
        setHasWriteBenefs(hasWriteAccess('Beneficiaries'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        refetchWithSameParameters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paging.pageCursor, filters, paging.limit]);

    if (error) {
        return (
            <TableRow>
                <TableCell>Error :(</TableCell>
            </TableRow>
        );
    }

    const nodes = data === undefined ? [] : data.filteredBeneficiaries.nodes;
    const pageInfo = data === undefined ? undefined : data.filteredBeneficiaries.pageInfo;
    const edges = data === undefined ? [] : data.filteredBeneficiaries.edges;

    return (
        <Card>
            <CardHeader action={props.children} title='Beneficiarios' titleTypographyProps={{variant: 'h6'}}/>
            <TableContainer>
                {loading && <LinearProgress/>}
                <Table sx={{minWidth: 800}} aria-label='table in dashboard'>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>DNI</TableCell>
                            <TableCell>ID de Familia</TableCell>
                            <TableCell>Nombre Completo</TableCell>
                            <TableCell>Género</TableCell>
                            <TableCell>Fecha de Nacimiento</TableCell>
                            <TableCell>Tipo</TableCell>
                            {hasWriteBenefs && <TableCell>Acciones</TableCell>}
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        
                        {nodes.map((row: Beneficiary, index: number) => (
                            <DisplayBeneficiary
                                key={index}
                                index={index}
                                benef={row}
                                open={open}
                                setOpen={setOpen}
                                benefsQ={nodes.length}
                            >
                                {hasWriteBenefs && (
                                    <TableCell>
                                        <Box display='flex' flexDirection='row' justifyContent='space-between'>
                                            {row.isActive && (
                                                <Button
                                                    variant='contained'
                                                    sx={{mx: '.25em'}}
                                                    onClick={async () => {
                                                        try {
                                                            await deleteBeneficiary(row.id ? row.id : '-1').then(() => refetchWithSameParameters());
                                                            setAction({
                                                                complete: true,
                                                                success: true,
                                                                message: 'Usuario desactivado exitosamente',
                                                                status: 200
                                                            });
                                                        } catch (err) {
                                                            setAction({
                                                                complete: true,
                                                                success: false,
                                                                message: 'Algo ha ocurrido desactivando el usuario. Intente nuevamente más tarde',
                                                                status: 400
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <Typography color={'white'}>Desactivar</Typography>
                                                </Button>
                                            )}
                                            {!row.isActive && (
                                                <Button
                                                    variant='contained'
                                                    sx={{mx: '.25em'}}
                                                    onClick={async () => {
                                                        try {
                                                            await activateBeneficiary(row.id ? row.id : '-1').then(() => refetchWithSameParameters());
                                                            setAction({
                                                                complete: true,
                                                                success: true,
                                                                message: 'Usuario activado exitosamente',
                                                                status: 200
                                                            });
                                                        } catch (err) {
                                                            setAction({
                                                                complete: true,
                                                                success: false,
                                                                message: 'Algo ha ocurrido activando el usuario. Intente nuevamente más tarde',
                                                                status: 400
                                                            });
                                                        }
                                                    }}
                                                >
                                                    <Typography color={'white'}>Activar</Typography>
                                                </Button>
                                            )}
                                            {row.isActive && (
                                                <Button
                                                    variant='contained'
                                                    sx={{mx: '.25em'}}
                                                    onClick={() => {
                                                        setSelectedBeneficiary(row);
                                                        setOpenEditBeneficiary(true);
                                                    }}
                                                >
                                                    <Typography color={'white'}>Editar</Typography>
                                                </Button>
                                            )}
                                        </Box>
                                    </TableCell>
                                )}
                            </DisplayBeneficiary>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {pageInfo !== undefined && (
                <BeneficiaryTablePagination
                    paging={paging}
                    setBeneficiariesPaging={setBeneficiariesPaging}
                    pageInfo={pageInfo}
                    nodes={nodes}
                    edges={edges}
                />
            )}
            {openEditBeneficiary && !!selectedBeneficiary && (
                <BeneficiaryEditForm
                    openDialog={openEditBeneficiary}
                    handleClose={() => setOpenEditBeneficiary(false)}
                    setBeneficiaryEdited={setBeneficiaryEdited}
                    communities={communities}
                    action='Editar'
                    beneficiary={selectedBeneficiary}
                    setAction={setAction}
                />
            )}

        </Card>
    );
};

export default BeneficiariesTable;
