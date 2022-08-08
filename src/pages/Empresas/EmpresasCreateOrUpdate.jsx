import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';
import ButtonCommon from '../../components/ButtonCommon';
import DatePickerCommon from '../../components/Datepicker';
import SelectCommon from '../../components/SelectCommon';
import TextFieldCommon from '../../components/TextFieldCommon';
import ActionCerrar from '../../components/ButtonsAction/ActionCerrar';

function EmpresasCreateOrUpdateModal() {
  const modal = useModal();
  return (
    <Dialog
      fullScreen={false}
      maxWidth="lg"
      fullWidth
      open={modal.visible}
      onClose={() => modal.hide()}
    >
      <Stack
        sx={{
          position: 'absolute',
          cursor: 'pointer',
          marginTop: '15px',
          marginLeft: '96%'
        }}
        direction="row"
        justifyContent="flex-end"
      >
        <ActionCerrar
          onClick={() => {
            modal.remove();
          }}
        />
      </Stack>
      <DialogTitle sx={{ padding: '10px', margin: '0px 10px' }}>
        Crear empresa
      </DialogTitle>
      <DialogContent>
        <form>
          <Typography
            sx={{
              fontSize: '16px',
              padding: '0px 30px',
              margin: '0px 10px',
              color: '#6D66CC'
            }}
          >
            Datos de ubicación
          </Typography>
          <Box sx={{ padding: '10px 40px 0px 40px ' }}>
            <Grid container direction="row" spacing={2} marginBottom={2}>
              <Grid item lg={6}>
                <SelectCommon required label="Departamento" />
              </Grid>
              <Grid item lg={6}>
                <SelectCommon required label="Municipio" />
              </Grid>
            </Grid>
          </Box>

          <Typography
            sx={{
              fontSize: '16px',
              padding: '0px 30px',
              margin: '0px 10px',
              color: '#6D66CC'
            }}
          >
            Datos de identificación
          </Typography>
          <Box sx={{ padding: '10px 40px 0px 40px ' }}>
            <Grid container direction="row" spacing={2} marginBottom={2}>
              <Grid item lg={4}>
                <TextFieldCommon required label="Nit" />
              </Grid>
              <Grid item lg={4}>
                <TextFieldCommon required label="Nombre" />
              </Grid>
              <Grid item lg={4}>
                <SelectCommon required label="Tipo " />
              </Grid>
              <Grid item lg={4}>
                <TextFieldCommon required label="Correo electronico" />
              </Grid>
              <Grid item lg={4}>
                <TextFieldCommon required label="Número de telefono" />
              </Grid>
              <Grid item lg={4}>
                <DatePickerCommon required label="Fecha de convenio" />
              </Grid>
            </Grid>
          </Box>
          <Stack
            spacing={2}
            direction="row"
            sx={{ margin: '20px', justifyContent: 'center' }}
          >
            <ButtonCommon
              type="button"
              variant="outlined"
              onClick={() => {
                modal.hide();
              }}
            >
              CANCELAR
            </ButtonCommon>
            <ButtonCommon type="submit">CONTINUAR</ButtonCommon>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default NiceModal.create(EmpresasCreateOrUpdateModal);
