// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FooterContent = () => {
  // ** Var
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography>
        {`Mamis Solidarias© ${new Date().getFullYear()}, Hecho con `}
        <Box component='span' sx={{ color: 'error.main' }}>
          ❤️
        </Box>
        {` por Lucas Dell'Isola & Ignacio Sampedro `}
      </Typography>
    </Box>
  );
};

export default FooterContent;
