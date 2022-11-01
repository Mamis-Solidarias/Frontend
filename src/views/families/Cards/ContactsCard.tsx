import CardContent from '@mui/material/CardContent';
import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Contact from 'src/types/Contact';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { CONTACTING_METHODS } from 'src/types/ContactingMethods';

interface ContactsCardProps {
  contacts: Contact[];
}

export const ContactsCard: FC<ContactsCardProps> = props => {
  const { contacts } = props;

  const style = { ...{ margin: '15px' } };

  return (
    <Card sx={style}>
      <CardHeader title='Contactos' titleTypographyProps={{ sx: { letterSpacing: '0.15px !important' } }} />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.0)} !important` }}>
        <TableContainer>
          <Table aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Contenido</TableCell>
                <TableCell>Forma de Contacto</TableCell>
                <TableCell>Es Preferido</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact: Contact) => (
                <TableRow key={contact.title}>
                  <TableCell>{contact.title}</TableCell>
                  <TableCell>{contact.content}</TableCell>
                  <TableCell>{CONTACTING_METHODS[contact.type as keyof typeof CONTACTING_METHODS]}</TableCell>
                  <TableCell>{contact.isPreferred ? 'Sí' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
