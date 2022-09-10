// ** MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const FooterContent = () => {
  // ** Var
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
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
