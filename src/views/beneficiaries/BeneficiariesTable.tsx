import React, { FC } from 'react';

// ** MUI Imports
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

// ** Types Imports
import { useQuery, gql } from '@apollo/client';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface RowType {
  id: string;
  familyId: string;
  firstName: string;
  lastName: string;
  type: string;
  gender: string;
  birthday: string;
  dni: string;
  comments?: string;
  likes?: string;
  clothes?: {
    shoeSize: string;
    pantsSize: string;
    shirtSize: string;
  };
  education?: {
    school: string;
    year: string;
    transportationMethod: string;
  };
  health?: {
    hasCovidVaccine: boolean;
    hasMandatoryVaccines: boolean;
    observations: string;
  };
  job: { title: string };
}

const BeneficiariesTable: FC = () => {
  const GetBeneficiaries = () => {
    const GET_BENEFICIARIES = gql`
      query getBeneficiaries {
        beneficiaries {
          nodes {
            dni
            birthday
            comments
            familyId
            firstName
            gender
            id
            isActive
            lastName
            likes
            type
            health {
              hasCovidVaccine
              hasMandatoryVaccines
              observations
            }
            education {
              school
              year
              transportationMethod
            }
            job {
              title
            }
          }
        }
      }
    `;
    const { loading, error, data } = useQuery(GET_BENEFICIARIES);

    if (loading)
      return (
        <TableRow>
          <TableCell>Loading...</TableCell>
        </TableRow>
      );
    if (error)
      return (
        <TableRow>
          <TableCell>Error :(</TableCell>
        </TableRow>
      );

    const GENDERS = { MALE: 'Masculino', FEMALE: 'Femenino', OTHER: 'Otro' };
    const TYPES = { ADULT: 'Adulto', CHILD: 'Niño' };
    const TRANSPORT_METHODS = {
      BIKE: 'Bicicleta',
      CAR: 'Auto',
      HORSE: 'Caballo',
      PUBLIC_TRANSPORT: 'Transporte Público',
      WALKING: 'Caminando',
      OTHER: 'Otros'
    };

    const nodes = data.beneficiaries.nodes;
    const open = Array.from({ length: nodes.length }, () => true);

    return nodes.map((row: RowType, index: number) => (
      <React.Fragment key={row.id}>
        <TableRow hover sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
          <TableCell>
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => {
                (open[index] = !open[index]), console.log(open);
              }}
            >
              {open[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row.dni}</TableCell>
          <TableCell>{row.familyId}</TableCell>
          <TableCell>{row.firstName + ' ' + row.lastName}</TableCell>
          <TableCell>{GENDERS[row.gender as keyof typeof GENDERS]}</TableCell>
          <TableCell>{row.birthday}</TableCell>
          <TableCell>{TYPES[row.type as keyof typeof TYPES]}</TableCell>
        </TableRow>
        <TableRow sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
          <TableCell colSpan={12}>
            <Collapse in={open[index]} timeout='auto' unmountOnExit>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                {!!row.education && (
                  <Card sx={{ backgroundColor: '#fea7a7' }}>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        Educación
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        <p>
                          <strong>Institución:</strong>&ensp;
                          {row.education.school}
                        </p>
                        <p>
                          <strong>Año académico:</strong>&ensp;
                          {row.education.year}
                        </p>
                        <p>
                          <strong>Método de Transporte: </strong>&ensp;
                          {TRANSPORT_METHODS[row.education.transportationMethod as keyof typeof TRANSPORT_METHODS]}
                        </p>
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {!!row.health && (
                  <Card sx={{ backgroundColor: '#fea7a7' }}>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        Salud
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        <p>
                          <strong>¿Tiene Vacuna COVID?:</strong>&ensp;
                          {row.health.hasCovidVaccine}
                        </p>
                        <p>
                          <strong>¿Tiene Vacunas Mandatorias?:</strong>&ensp;
                          {row.health.hasMandatoryVaccines}
                        </p>
                        <p>
                          <strong>Observaciones: </strong>&ensp;
                          {row.health.observations}
                        </p>
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {!!row.clothes && (
                  <Card sx={{ backgroundColor: '#fea7a7' }}>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        Ropa
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        <p>
                          <strong>Talle de Calzado:</strong>&ensp;
                          {row.clothes.shoeSize}
                        </p>
                        <p>
                          <strong>Talle de Pantalones:</strong>&ensp;
                          {row.clothes.pantsSize}
                        </p>
                        <p>
                          <strong>Talle de Remera: </strong>&ensp;
                          {row.clothes.shirtSize}
                        </p>
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {!!row.comments && (
                  <Card sx={{ backgroundColor: '#fea7a7' }}>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        Comentarios
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {row.comments}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {!!row.likes && (
                  <Card sx={{ backgroundColor: '#fea7a7' }}>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        Qué le Gusta
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {row.likes}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
                {!!row.job && (
                  <Card sx={{ backgroundColor: '#fea7a7' }}>
                    <CardContent>
                      {' '}
                      <Typography gutterBottom variant='h5' component='div'>
                        Trabajo
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        <p>
                          <strong>Título:</strong>&ensp;
                          {row.job.title}
                        </p>
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    ));
  };

  return (
    <>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>ID de Familia</TableCell>
                <TableCell>Nombre Completo</TableCell>
                <TableCell>Género</TableCell>
                <TableCell>Fecha de Nacimiento</TableCell>
                <TableCell>Tipo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <GetBeneficiaries />
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default BeneficiariesTable;
