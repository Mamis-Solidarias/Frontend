import CardContent from '@mui/material/CardContent';
import React, { FC } from 'react';
import Card from '@mui/material/Card';
import Contact from 'src/types/beneficiaries/Contact';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { CONTACTING_METHODS } from 'src/types/beneficiaries/ContactingMethods';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import DeviceUnknownIcon from '@mui/icons-material/DeviceUnknown';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import { Link } from '@mui/material';

interface ContactsCardProps {
  contacts: Contact[];
}

export const ContactsCard: FC<ContactsCardProps> = props => {
  const { contacts } = props;

  const style = { ...{ margin: '15px' } };

  return (
    <Card sx={style}>
      <CardContent sx={{ pt: theme => `${theme.spacing(2.0)} !important` }}>
        <TableContainer>
          <Table aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Contenido</TableCell>
                <TableCell>¿Preferido?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact: Contact) => (
                <TableRow key={contact.title}>
                  {CONTACTING_METHODS[contact.type as keyof typeof CONTACTING_METHODS] ===
                    CONTACTING_METHODS.FACEBOOK && (
                    <TableCell>
                      <FacebookIcon sx={{ color: '#4267B2' }} />
                    </TableCell>
                  )}
                  {CONTACTING_METHODS[contact.type as keyof typeof CONTACTING_METHODS] ===
                    CONTACTING_METHODS.INSTAGRAM && (
                    <TableCell>
                      <InstagramIcon sx={{ color: '#E1306C' }} />
                    </TableCell>
                  )}
                  {CONTACTING_METHODS[contact.type as keyof typeof CONTACTING_METHODS] === CONTACTING_METHODS.EMAIL && (
                    <TableCell>
                      <Link
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                        href={'mailto:' + contact.content}
                        sx={{ color: 'black' }}
                      >
                        <MailIcon />
                      </Link>
                    </TableCell>
                  )}
                  {CONTACTING_METHODS[contact.type as keyof typeof CONTACTING_METHODS] === CONTACTING_METHODS.PHONE && (
                    <TableCell>
                      <Link
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                        href={'tel:' + contact.content}
                        sx={{ color: 'lightBlue' }}
                      >
                        <CallIcon />
                      </Link>
                    </TableCell>
                  )}
                  {CONTACTING_METHODS[contact.type as keyof typeof CONTACTING_METHODS] ===
                    CONTACTING_METHODS.WHATSAPP && (
                    <TableCell>
                      <Link
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                        href={'https://api.whatsapp.com/send?phone=' + contact.content}
                        sx={{ color: '#075e54' }}
                      >
                        <WhatsAppIcon />
                      </Link>
                    </TableCell>
                  )}
                  {CONTACTING_METHODS[contact.type as keyof typeof CONTACTING_METHODS] === CONTACTING_METHODS.OTHER && (
                    <TableCell>
                      <DeviceUnknownIcon sx={{ color: 'gray' }} />
                    </TableCell>
                  )}
                  <TableCell>{contact.title}</TableCell>
                  <TableCell>{contact.content}</TableCell>
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
