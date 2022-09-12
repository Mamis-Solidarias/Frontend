import { FC } from 'react';

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
  clothes?: any;
  education?: string;
  health: {
    hasCovidVaccine: boolean;
    hasMandatoryVaccines: boolean;
    observations: string;
  };
  job: any;
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
            education {
              school
              year
              transportationMethod
            }
          }
        }
      }
    `;
    const { loading, error, data } = useQuery(GET_BENEFICIARIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const GENDERS = { MALE: 'Masculino', FEMALE: 'Femenino', OTHER: 'otro' };
    const TYPES = { ADULT: 'Adulto', CHILD: 'Niño' };

    return data.beneficiaries.nodes.map((row: RowType) => (
      <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
        <TableCell>{row.familyId}</TableCell>
        <TableCell>{row.firstName + ' ' + row.lastName}</TableCell>
        <TableCell>{GENDERS[row.gender as keyof typeof GENDERS]}</TableCell>
        <TableCell>{row.birthday}</TableCell>
        <TableCell>{row.dni}</TableCell>
        <TableCell>{TYPES[row.type as keyof typeof TYPES]}</TableCell>
      </TableRow>
    ));
  };

  return (
    <>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>ID de Familia</TableCell>
                <TableCell>Nombre Completo</TableCell>
                <TableCell>Género</TableCell>
                <TableCell>Cumpleaños</TableCell>
                <TableCell>DNI</TableCell>
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
