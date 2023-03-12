import Dialog from '@mui/material/Dialog';
import { updateAmount, updateAssignPayment, updateCurrency } from 'src/features/campaigns/paymentSlice';
import { useAppDispatch, useAppSelector } from 'src/hooks/reduxHooks';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { createDonation } from 'src/API/Donations/donations_data';
import { Action } from 'src/types/Action';
import MenuItem from '@mui/material/MenuItem';

interface AssignPaymentProps {
  setAction: (action: Action) => void;
}

export default (props: AssignPaymentProps) => {
  const { setAction } = props;
  const dispatch = useAppDispatch();
  const campaignPaymentSelector = useAppSelector(state => state.campaignPayment);

  const resetFields = () => {
    dispatch(updateCurrency('ARS'));
    dispatch(updateAmount(-1));
  };

  const resetAllFields = () => {
    resetFields();
    dispatch(updateAssignPayment(false));
  };

  const assignPayment = async () => await createDonation(campaignPaymentSelector.paymentData);

  const assignPaymentHandler = async () => {
    try {
      await assignPayment();
      setAction({
        complete: true,
        success: true,
        message: 'Pago realizado con éxito',
        status: 201
      });
      resetAllFields();
    } catch (e) {
      setAction({
        complete: true,
        success: false,
        message: 'Ocurrió un error Asignando el pago. Intente nuevamente más tarde',
        status: 201
      });
    }
  };

  return (
    <Dialog open={campaignPaymentSelector.assignPayment} onClose={() => resetAllFields()} maxWidth='lg'>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>Asignar Pago</DialogTitle>
      <DialogContent>
        <TextField
          select
          id='currency'
          type='text'
          sx={{ py: '.3em' }}
          inputProps={{ pattern: '^.+$' }}
          label='Tipo de Pago'
          placeholder='ARS'
          value={campaignPaymentSelector.paymentData.currency}
          onChange={(e: any) => dispatch(updateCurrency(e.target.value))}
          fullWidth={true}
          variant='standard'
        >
          <MenuItem key={'ARS'} value={'ARS'}>
            Peso Argentino
          </MenuItem>
          <MenuItem key={'USD'} value={'USD'}>
            Dólar Estadounidense
          </MenuItem>
          <MenuItem key={'EUR'} value={'EUR'}>
            Euros
          </MenuItem>
        </TextField>
        <TextField
          id='amount'
          type='number'
          sx={{ py: '.3em' }}
          inputProps={{ pattern: '^.+$' }}
          label='Cantidad'
          placeholder='200.0'
          value={
            campaignPaymentSelector.paymentData.amount > 0 ? campaignPaymentSelector.paymentData.amount : undefined
          }
          onChange={(e: any) => dispatch(updateAmount(parseFloat(e.target.value)))}
          fullWidth={true}
          variant='standard'
        />

        <Button
          sx={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '1em' }}
          variant='contained'
          onClick={async () => await assignPaymentHandler()}
          disabled={campaignPaymentSelector.paymentData.amount <= 0}
        >
          Realizar Pago
        </Button>
      </DialogContent>
    </Dialog>
  );
};
