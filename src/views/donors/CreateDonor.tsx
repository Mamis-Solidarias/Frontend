import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import {FC} from 'react';
import {createDonor} from 'src/API/Donors/donors_data';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {defaultDonor, useModifyDonor} from 'src/hooks/donors/useModifyDonor';
import {Action} from 'src/types/Action';

interface CreateDonorProps {
    openDialog: boolean;
    handleClose: () => void;
    setAction: (action: Action) => void;
}

export const CreateDonor: FC<CreateDonorProps> = props => {
    const {openDialog, handleClose, setAction} = props;
    const {donor, setDonor, setDonorField} = useModifyDonor();

    const resetFields = () => {
        setDonor(defaultDonor);
    };

    const resetAllFields = () => {
        resetFields();
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
            <DialogTitle sx={{display: 'flex', justifyContent: 'center'}}>Crear Donante</DialogTitle>
            <DialogContent>
                <Box>
                    <TextField
                        id='name'
                        type='text'
                        sx={{py: '.3em'}}
                        inputProps={{pattern: '^.+$'}}
                        label='Nombre'
                        placeholder='Pedro Mendoza'
                        value={donor.name}
                        onChange={(e: any) => {
                            setDonorField('name', e.target.value);
                        }}
                        fullWidth={true}
                        variant='standard'
                    />
                    <TextField
                        id='email'
                        type='text'
                        sx={{py: '.3em'}}
                        inputProps={{pattern: '^.+$'}}
                        label='Email'
                        placeholder='pmendoza@gmail.com'
                        value={donor.email}
                        onChange={(e: any) => {
                            setDonorField('email', e.target.value);
                        }}
                        fullWidth={true}
                        variant='standard'
                    />
                    <TextField
                        id='phone'
                        type='text'
                        sx={{py: '.3em'}}
                        inputProps={{pattern: '^.+$'}}
                        label='Teléfono'
                        placeholder='+5492995077824'
                        value={donor.phone}
                        onChange={(e: any) => {
                            setDonorField('phone', e.target.value);
                        }}
                        fullWidth={true}
                        variant='standard'
                    />
                    <Stack direction='row' spacing={1} alignItems='center' sx={{py: '.3em'}}>
                        <Typography>No es padrino</Typography>
                        <Switch onChange={(e: any) => setDonorField('isGodFather', e.target.checked)}
                                checked={donor.isGodFather}/>
                        <Typography>Es padrino</Typography>
                    </Stack>
                </Box>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Button
                        sx={{display: 'flex', justifyContent: 'center', margin: '1%', width: '100%'}}
                        variant='outlined'
                        onClick={() => {
                            handleClose();
                            resetAllFields();
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        sx={{display: 'flex', justifyContent: 'center', margin: '1%', width: '100%'}}
                        variant='contained'
                        onClick={async () => {
                            try {
                                await createDonor({
                                    name: donor.name,
                                    email: donor.email,
                                    phone: donor.phone,
                                    isGodFather: donor.isGodFather
                                });
                                setAction({
                                    complete: true,
                                    success: true,
                                    message: 'Donante creado exitosamente',
                                    status: 201
                                });
                                resetAllFields();
                                handleClose();
                            } catch (error) {
                                setAction({
                                    complete: true,
                                    success: false,
                                    message: 'Ocurrió un error creando el donante. Intente nuevamente más tarde',
                                    status: 201
                                });
                            }
                        }}
                        disabled={!donor.name || (!donor.phone && !donor.email)}
                    >
                        Crear
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
