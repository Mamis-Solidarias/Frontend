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
import { useEffect, useState } from 'react';
import { getFamily } from 'src/API/Beneficiaries/families_data';

interface BeneficiariesTableProps {
  familyId?: string;
}

interface RowType {
  id: string;
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

const BeneficiariesTable: FC<BeneficiariesTableProps> = props => {
  const { familyId } = props;
  const [rows, setRows] = useState<any>();

  useEffect(() => {
    if (!!familyId) {
      getFamily(localStorage.getItem('user'), familyId).then(result => {
        setRows(result.data.families);
      });
    }
  }, [familyId]);

  return (
    <>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre Completo</TableCell>
                <TableCell>Género</TableCell>
                <TableCell>Cumpleaños</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>Qué le gusta</TableCell>
                <TableCell>Ropa</TableCell>
                <TableCell>Educación</TableCell>
                <TableCell>Salud</TableCell>
                <TableCell>Trabajo</TableCell>
                <TableCell>Tipo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!rows &&
                rows.map((row: RowType) => (
                  <TableRow hover key={row.id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                    <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>{row.id}</TableCell>
                    <TableCell>{row.firstName + ' ' + row.lastName}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.birthday}</TableCell>
                    <TableCell>{row.dni}</TableCell>
                    <TableCell>{row.likes}</TableCell>
                    <TableCell>{row.clothes}</TableCell>
                    <TableCell>{row.health}</TableCell>
                    <TableCell>{row.job}</TableCell>
                    <TableCell>{row.type}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default BeneficiariesTable;
