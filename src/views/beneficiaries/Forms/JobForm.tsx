import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { FC } from 'react';
import Typography from '@mui/material/Typography';

interface JobFormProps {
  title: string;
  setTitle: (value: string) => void;
  setAddJob: (value: boolean) => void;
}

export const JobForm: FC<JobFormProps> = props => {
  const { title, setTitle, setAddJob } = props;

  return (
    <>
      <Typography>Datos de Educación</Typography>
      <TextField
        style={{ padding: '1em' }}
        type='text'
        label='Título'
        placeholder='Albañil'
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth={true}
        variant='standard'
      />
      <Button
        sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: '1em' }}
        variant='contained'
        color='warning'
        onClick={() => {
          setTitle('');
          setAddJob(false);
        }}
      >
        Borrar Trabajo
      </Button>
    </>
  );
};
