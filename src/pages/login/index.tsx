// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react';

// ** Next Imports
import { useRouter } from 'next/router';

// ** MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

// ** Configs
import themeConfig from 'src/configs/themeConfig';

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout';

// ** Demo Imports
import FooterIllustrationsV1 from 'src/views/pages/auth/FooterIllustration';
import FormHelperText from '@mui/material/FormHelperText';
import { loginUser } from 'src/API/Users/auth';
import { getUser } from 'src/API/Users/user_data';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import React from 'react';
import { useAction } from 'src/hooks/actionHook';
import ActionToast from 'src/views/pages/misc/ActionToast';
import Portal from '@mui/material/Portal';

interface State {
  password: string;
  showPassword: boolean;
}

// ** Styled Components
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9'
  }
}));

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LoginPage = () => {
  const { action, setAction, setCompletion } = useAction();

  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  });

  // ** Hook
  const theme = useTheme();
  const router = useRouter();
  const [showBadRequest, setShowBadRequest] = useState<boolean>(false);

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    loginUser(event.target.email.value, values.password)
      .then(async response => {
        if (response.status === 200) {
          const getUserResponse = await getUser(response.data.id);
          setAction({
            complete: true,
            success: true,
            message: 'Sesión iniciada correctamente',
            status: 200
          });
          localStorage.setItem('user', JSON.stringify(getUserResponse.data.user));
          router.push('/');
        }
      })
      .catch(() => {
        setAction({
          complete: true,
          success: false,
          message:
            'Hubo un error iniciando sesión con los datos cargados. Revisar que sean correctos e intentar nuevamente',
          status: 400
        });
        setShowBadRequest(true);
      });
  };

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src='https://www.mamissolidarias.org.ar/images/mamis-solidarias-grande.png'
              alt='Logo Mamis Solidarias'
            />
          </Box>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography
              variant='h6'
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              {themeConfig.templateName}
            </Typography>
          </Box>
          <form noValidate onSubmit={e => handleSubmit(e)}>
            <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 4 }} />
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {showBadRequest && (
              <FormHelperText sx={{ mt: '1em' }} error={true}>
                Ingresar email y contraseña válidos
              </FormHelperText>
            )}
            <Box
              sx={{ my: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <div>
                  <HtmlTooltip
                    PopperProps={{
                      disablePortal: true
                    }}
                    onClose={handleTooltipClose}
                    open={open}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={
                      <React.Fragment>
                        {'Enviar mail a '}
                        <a href='mailto:admin@mamis.com'>admin@mamis.com</a>
                        {' para poder proceder a la restitución de la contraseña'}
                      </React.Fragment>
                    }
                  >
                    <Button
                      sx={{ fontSize: '0.875rem', textDecoration: 'none', color: theme.palette.primary.main }}
                      onClick={handleTooltipOpen}
                    >
                      Olvidé la contraseña
                    </Button>
                  </HtmlTooltip>
                </div>
              </ClickAwayListener>
            </Box>
            <Button fullWidth size='large' variant='contained' sx={{ marginBottom: 7 }} type='submit'>
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
      <Portal>
        <ActionToast action={action} setActionCompletion={setCompletion} />
      </Portal>
    </Box>
  );
};

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default LoginPage;
