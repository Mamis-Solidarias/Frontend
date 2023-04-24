import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

import {FC, useState} from "react";
import {updateUser} from "src/API/Users/user_data";
import {Action} from "src/types/Action";

interface UpdateUserProps {
  id: any;
  openDialog: boolean;
  handleClose: () => void;
  setAction: (action: Action) => void;
}

const emailPattern = /^[^@]+@[^@]+$/;
const namePattern = /.{5,100}/;
const phonePattern = /^\+?(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;

export const UpdateUser: FC<UpdateUserProps> = props => {
  const {openDialog, handleClose, id, setAction} = props;
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [invalidEmail, setInvalidEmail] = useState<boolean>(false);
  const [invalidName, setInvalidName] = useState<boolean>(false);
  const [invalidPhone, setInvalidPhone] = useState<boolean>(false);

  const detectInvalidEmail = (email: string) => {
    if (emailPattern.test(email)) {
      setInvalidEmail(false);
    } else {
      setInvalidEmail(true);
    }
  };

  const detectInvalidName = (name: string) => {
    if (namePattern.test(name)) {
      setInvalidName(false);
    } else {
      setInvalidName(true);
    }
  };

  const detectInvalidPhone = (phone: string) => {
    if (phonePattern.test(phone)) {
      setInvalidPhone(false);
    } else {
      setInvalidPhone(true);
    }
  };

  const resetFields = () => {
    setEmail("");
    setName("");
    setPhone("");
    setInvalidEmail(false);
    setInvalidName(false);
    setInvalidPhone(false);
  };

  const handleSubmit = async () => {
    const emailToSend = !!email ? email : null;
    const nameToSend = !!name ? name : null;
    const phoneToSend = !!phone ? phone : null;
    try {
      await updateUser(id, {email: emailToSend, name: nameToSend, phone: phoneToSend});
      setAction({
        complete: true,
        success: true,
        message: "Datos de usuario modificados exitosamente",
        status: 200
      });
      resetFields();
      handleClose();
    } catch (err) {
      setAction({
        complete: true,
        success: false,
        message: "Ocurrió un error modificando los datos del usuario. Intente nuevamente más tarde",
        status: 200
      });
    }
  };

  return (
    <Dialog
      open={openDialog}
      onClose={() => {
        resetFields();
        handleClose();
      }}
    >
      <DialogTitle sx={{display: "flex", justifyContent: "center"}}>Editar Usuario</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            error={invalidEmail}
            id="email"
            type="email"
            sx={{py: ".3em"}}
            inputProps={{pattern: "^[^@]+@[^@]+$"}}
            label="Email"
            placeholder="usuario@mail.com"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              detectInvalidEmail(e.target.value);
            }}
            fullWidth={true}
            variant="standard"
          />
          {invalidEmail && (
            <FormHelperText error>
              La dirección de correo electrónico es inválida. Seleccione una direccion de correo válida
            </FormHelperText>
          )}
          <TextField
            error={invalidName}
            sx={{py: ".3em"}}
            id="name"
            type="text"
            inputProps={{pattern: " .{5,100}"}}
            label="Nombre"
            placeholder="nuevousuario123"
            value={name}
            onChange={e => {
              setName(e.target.value);
              detectInvalidName(e.target.value);
            }}
            fullWidth={true}
            variant="standard"
          />
          {invalidName && (
            <FormHelperText error>El nombre es inválido. Tiene que tener entre 5 y 100 caracteres</FormHelperText>
          )}
          <TextField
            error={invalidPhone}
            id="phone"
            type="tel"
            sx={{py: ".3em"}}
            inputProps={{pattern: " ^+?(?:(?:00)?549?)?0?(?:11|[2368]d)(?:(?=d{0,2}15)d{2})??d{8}$"}}
            label="Teléfono"
            placeholder="+5492995077824"
            value={phone}
            onChange={e => {
              setPhone(e.target.value);
              detectInvalidPhone(e.target.value);
            }}
            fullWidth={true}
            variant="standard"
          />
          {invalidPhone && <FormHelperText error>El número de teléfono es inválido</FormHelperText>}
          <Button
            type="submit"
            sx={{display: "flex", justifyContent: "center", width: "100%"}}
            variant="contained"
            disabled={invalidEmail || invalidName || invalidPhone || (!name && !phone && !email)}
          >
            Editar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
