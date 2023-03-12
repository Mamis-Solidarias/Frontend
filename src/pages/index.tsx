import Box from '@mui/material/Box';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';

// ** Demo Components Imports

export default () => {
  return (
    <ApexChartWrapper>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mx: '5em' }}>
        <Box>
          <img src='https://mamissolidarias.org.ar/images/mamis-solidarias-grande.png' alt='' />
        </Box>
        <Box sx={{ fontSize: '1.5em' }}>
          <Box component='p'>
            Somos un equipo de mujeres y hombres que trabaja por una<strong>&nbsp;infancia</strong>&nbsp;con más&nbsp;
            <strong>oportunidades</strong>.
          </Box>
          <Box component='p'>
            Nacimos como grupo solidario en el año 2015. Movilizados por las necesidades que veíamos a nuestro
            alrededor, luego de un largo camino recorrido, adquiriendo experiencia y tomando cada acción como
            aprendizaje, decidimos conformar la Asociación Civil Mamis Solidarias.
          </Box>
          <Box component='p'>
            Nuestro trabajo por la niñez se aborda a través de campañas especialmente enfocadas en cada necesidad:
          </Box>
          <Box component='p'>Educación, juego, abrigo, alimentación y contención.</Box>
          <Box component='p'>Hoy llegamos a más de 800 chicos de las provincias de Buenos Aires y Misiones.</Box>
        </Box>
      </Box>
    </ApexChartWrapper>
  );
};
