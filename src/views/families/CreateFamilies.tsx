import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import {FC, useState} from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import {createFamilies} from 'src/API/Beneficiaries/communities_data';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import Community from 'src/types/beneficiaries/Community';
import Grid from '@mui/material/Grid';
import {Action} from 'src/types/Action';
import {useQuery} from "@apollo/client";
import {GET_COMMUNITIES} from "src/API/Beneficiaries/beneficiaries_grapql";

interface CreateFamiliesProps {
    openDialog: boolean;
    handleClose: () => void;
    setAction: (action: Action) => void;
}

interface Contact {
    content: string;
    isPreferred: boolean;
    title: string;
    type: string;
}

interface Family {
    familyNumber: number | null;
    name: string;
    address: string;
    details: string | null;
    contacts: Contact[];
}

export const CreateFamilies: FC<CreateFamiliesProps> = props => {
    const {openDialog, handleClose, setAction} = props;
    const [number, setNumber] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [families, setFamilies] = useState<Family[]>([]);
    const [selectedCommunity, setSelectedCommunity] = useState<string>('');
    const {data: dataCommunities} = useQuery(GET_COMMUNITIES);


  const resetFields = () => {
        setNumber('');
        setName('');
        setAddress('');
        setDescription('');
    };

    const resetAllFields = () => {
        resetFields();
        setFamilies([]);
        setSelectedCommunity('');
    };

    const deleteFamily = (family: Family) => {
        const newFamilies = families.filter(newFamily => newFamily !== family);
        setFamilies(newFamilies);
    };

    return (
        <Dialog
            open={openDialog}
            onClose={() => {
                resetAllFields();
                handleClose();
            }}
            maxWidth='lg'
        >
            <DialogTitle sx={{display: 'flex', justifyContent: 'center'}}>Añadir Familias</DialogTitle>
            <DialogContent>
                <Box>
                    <Grid xs={12} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                        <Grid xs={5}>
                            <TextField
                                select
                                fullWidth={true}
                                variant='standard'
                                sx={{py: '.3em'}}
                                label='Comunidad'
                                placeholder='Misiones'
                                value={selectedCommunity}
                                onChange={e => setSelectedCommunity(e.target.value)}
                            >
                                <MenuItem value=''>Ninguna</MenuItem>
                                {!!dataCommunities?.communities?.nodes && dataCommunities.communities.nodes.map((community: Community) => (
                                  <MenuItem value={community.id} key={community.id}>
                                    {community.id + ' - ' + community.name}
                                  </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id='familyId'
                                type='text'
                                sx={{py: '.3em'}}
                                inputProps={{pattern: '[0-9]*$'}}
                                label='Código (opcional)'
                                placeholder='23'
                                value={number}
                                onChange={e => {
                                    setNumber(e.target.value);
                                }}
                                fullWidth={true}
                                variant='standard'
                            />
                            <TextField
                                id='familyName'
                                type='text'
                                sx={{py: '.3em'}}
                                inputProps={{pattern: '^.+$'}}
                                label='Nombre'
                                placeholder='García'
                                value={name}
                                onChange={e => {
                                    setName(e.target.value);
                                }}
                                fullWidth={true}
                                variant='standard'
                            />
                        </Grid>
                        <Grid xs={5}>
                            <TextField
                                id='address'
                                type='text'
                                sx={{py: '.3em'}}
                                inputProps={{pattern: '^.+$'}}
                                label='Dirección'
                                placeholder='Cataratas 123'
                                value={address}
                                onChange={e => {
                                    setAddress(e.target.value);
                                }}
                                fullWidth={true}
                                variant='standard'
                            />
                            <TextField
                                id='details'
                                type='text'
                                sx={{py: '.3em'}}
                                label='Detalle (opcional)'
                                placeholder='La familia de José'
                                value={description}
                                onChange={e => {
                                    setDescription(e.target.value);
                                }}
                                fullWidth={true}
                                variant='standard'
                            />
                        </Grid>
                    </Grid>
                    <Button
                        sx={{display: 'flex', justifyContent: 'center', width: '100%', marginTop: '1em'}}
                        variant='contained'
                        onClick={() => {
                            const finalDescription = !!description ? description : null;
                            const finalFamilyNumber: number | null = !!number ? parseInt(number) : null;
                            families.push({
                                familyNumber: finalFamilyNumber,
                                name,
                                address,
                                details: finalDescription,
                                contacts: []
                            });
                            resetFields();
                        }}
                        disabled={!address || !name || !selectedCommunity}
                    >
                        Añadir
                    </Button>
                </Box>
                <TableContainer>
                    <Table sx={{minWidth: 800}} aria-label='table in dashboard'>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Detalles</TableCell>
                                <TableCell>Forma de contacto</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!!families &&
                                families.map((family: Family) => (
                                    <TableRow
                                        hover
                                        key={family.familyNumber}
                                        sx={{'&:last-of-type td, &:last-of-type th': {border: 0}}}
                                    >
                                        <TableCell>{family.familyNumber}</TableCell>
                                        <TableCell
                                            sx={{py: theme => `${theme.spacing(0.5)} !important`}}>{family.name}</TableCell>
                                        <TableCell>{family.address}</TableCell>
                                        <TableCell>{family.details}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell>
                                            <IconButton aria-label='delete' size='small'
                                                        onClick={() => deleteFamily(family)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Button
                        sx={{display: 'flex', justifyContent: 'center', margin: '1%', width: '100%'}}
                        variant='outlined'
                        onClick={() => {handleClose(); resetAllFields()}}
                    >
                        Cancelar
                    </Button>
                    <Button
                        sx={{display: 'flex', justifyContent: 'center',margin:'1%', width: '100%'}}
                        variant='contained'
                        onClick={async () => {
                            try {
                                await createFamilies(selectedCommunity, families);
                                setAction({
                                    complete: true,
                                    success: true,
                                    message: 'Familias creadas exitosamente',
                                    status: 201
                                });
                                resetAllFields();
                                handleClose();
                            } catch (error) {
                                setAction({
                                    complete: true,
                                    success: false,
                                    message: 'Ha ocurrido un problema creando las familias. Intente nuevamente más tarde',
                                    status: 201
                                });
                            }
                        }}
                        disabled={families.length === 0}
                    >
                        Crear
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
