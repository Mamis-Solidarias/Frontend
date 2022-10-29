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
import {useModifyDonor} from 'src/hooks/donors/useModifyDonor';
import {Donor} from 'src/types/Donor';
import {Action} from 'src/types/Action';

interface UpdateDonorProps {
    donor: Donor | null;
    openDialog: boolean;
    handleClose: () => void;
    setAction: (action: Action) => void;
}

export const UpdateDonor: FC<UpdateDonorProps> = props => {
    const {openDialog, handleClose, donor, setAction} = props;
    const {donor: donorNewValues, setDonor, setDonorField} = useModifyDonor(donor);

    const resetFields = () => {
        if (!!donor) {
            setDonor(donor);
        }
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
            <DialogTitle sx={{display: 'flex', justifyContent: 'center'}}>Editar Donante</DialogTitle>
            <DialogContent>
                <Box>
                    <TextField
                        id='name'
                        type='text'
                        inputProps={{pattern: '^.+$'}}
                        label='Nombre'
                        placeholder='Pedro Mendoza'
                        value={donorNewValues.name}
                        onChange={(e: any) => {
                            setDonorField('name', e.target.value);
                        }}
                        fullWidth={true}
                        variant='standard'
                    />
                    <TextField
                        id='email'
                        type='text'
                        inputProps={{pattern: '^.+$'}}
                        label='Email'
                        placeholder='pmendoza@gmail.com'
                        value={donorNewValues.email}
                        onChange={(e: any) => {
                            setDonorField('email', e.target.value);
                        }}
                        fullWidth={true}
                        variant='standard'
                    />
                    <TextField
                        id='phone'
                        type='text'
                        inputProps={{pattern: '^.+$'}}
                        label='Teléfono'
                        placeholder='+5492995077824'
                        value={donorNewValues.phone}
                        onChange={(e: any) => {
                            setDonorField('phone', e.target.value);
                        }}
                        fullWidth={true}
                        variant='standard'
                    />
                    <Stack direction='row' spacing={1} alignItems='center'>
                        <Typography>No es padrino</Typography>
                        <Switch
                            onChange={(e: any) => setDonorField('isGodFather', e.target.checked)}
                            checked={donorNewValues.isGodFather}
                        />
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
                        sx={{display: 'flex', justifyContent: 'center',margin: '1%', width: '100%'}}
                        variant='contained'
                        onClick={async () => {
                            try {
                                await createDonor({
                                    name: donorNewValues.name,
                                    email: donorNewValues.email,
                                    phone: donorNewValues.phone,
                                    isGodFather: donorNewValues.isGodFather
                                });
                                setAction({
                                    complete: true,
                                    success: true,
                                    status: 200,
                                    message: 'Donante modificado exitosamente'
                                });
                                resetAllFields();
                                handleClose();
                            } catch (e) {
                                setAction({
                                    complete: true,
                                    success: false,
                                    status: 400,
                                    message: 'Ha ocurrido un problema modificando los datos del donante. Intente nuevamente más tarde'
                                });
                            }
                        }}
                        disabled={!donorNewValues.name || (!donorNewValues.phone && !donorNewValues.email)}
                    >
                        Editar
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
