// ** React Imports
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import { Action } from 'src/types/Action';

interface ActionToastProps {
  action: Action;
  setActionCompletion: (complete: boolean) => void;
}

const ActionToast = (props: ActionToastProps) => {
  const { action, setActionCompletion } = props;

  return (
    <Snackbar
      open={action.complete}
      autoHideDuration={2000}
      onClose={() => setActionCompletion(false)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={() => setActionCompletion(false)}
        severity={action.success ? 'success' : 'error'}
        sx={{ width: '100%', bgcolor: 'background.paper' }}
      >
        {action.message}
      </Alert>
    </Snackbar>
  );
};

export default ActionToast;
