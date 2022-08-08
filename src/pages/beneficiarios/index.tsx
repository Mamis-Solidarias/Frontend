import React from 'react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import CardContent from '@mui/material/CardContent';

import { Navigation } from '../../components/index';
import { beneficiaries } from '../../types/beneficiary';
import type { Beneficiary } from '../../types/beneficiary';
import { getFamily } from '../../types/family';
import Typography from '@mui/material/Typography';

const Beneficiarios = () => {
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex' }}>
      <Navigation />
      <Box sx={{ py: '5em', px: '5em' }}>
        <Typography variant="h2" align="center">
          Beneficiarios
        </Typography>
        <Button
          variant="outlined"
          onClick={() => router.push('/beneficiarios/crear')}
        >
          Crear Beneficiario
        </Button>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {beneficiaries.map((benef: Beneficiary) => (
            <Button
              sx={{ my: '3em', mx: '3em', minWidth: '20em' }}
              onClick={() => router.push('/beneficiarios/' + benef.id)}
              key={benef.id}
            >
              <Card
                key={benef.id}
                sx={{
                  minWidth: '100%',
                  minHeight: '100%',
                  backgroundColor: 'RGBA(0,112,243,0.3)',
                  borderRadius: '5%',
                  textAlign: 'start',
                  px: '1em',
                }}
              >
                <CardContent>
                  <strong>Nombre:</strong> {benef.firstName} {benef.lastName}
                </CardContent>
                <CardContent>
                  <strong>Familia:</strong> {getFamily(benef.familyId).name}
                </CardContent>
                <Divider />
                <CardContent>
                  <strong>Tipo:</strong> {benef.type}
                </CardContent>
              </Card>
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Beneficiarios;
