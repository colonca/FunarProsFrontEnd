import React from 'react';
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
import ActionCerrar from '../../components/ButtonsAction/ActionCerrar';
import SelectCommon from '../../components/SelectCommon';
import TextFieldCommon from '../../components/TextFieldCommon';
import ButtonCommon from '../../components/ButtonCommon';

function PropuestasModalCreateOrUpdate() {
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
        Crear Propuesta
      </DialogTitle>
      <DialogContent>
        <Typography
          sx={{
            fontSize: '16px',
            padding: '0px 30px',
            margin: '0px 10px',
            color: '#6D66CC'
          }}
        >
          Datos de la propuesta-Contrato
        </Typography>
        <Box sx={{ padding: '10px 40px 0px 40px ' }}>
          <Grid container direction="row" spacing={2} marginBottom={2}>
            <Grid item lg={4}>
              <SelectCommon required label="Departamento" onChange={() => {}} />
            </Grid>
            <Grid item lg={4}>
              <SelectCommon required label="Municipio" onChange={() => {}} />
            </Grid>
            <Grid item lg={4}>
              <SelectCommon
                required
                label="Tipo de contrato"
                onChange={() => {}}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2} marginBottom={2}>
            <Grid item lg={4}>
              <TextFieldCommon
                required
                label="Número del contrato"
                onChange={() => {}}
              />
            </Grid>
            <Grid item lg={4}>
              <TextFieldCommon
                required
                label="Nombre del contrato"
                onChange={() => {}}
              />
            </Grid>
            <Grid item lg={4}>
              <SelectCommon required label="Estado" onChange={() => {}} />
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
          Empresa a realizar el contrato
        </Typography>
        <Box sx={{ padding: '10px 40px 0px 40px ' }}>
          <SelectCommon required label="Empresa" />
        </Box>
        <Typography
          sx={{
            fontSize: '16px',
            padding: '0px 30px',
            margin: '0px 10px',
            color: '#6D66CC'
          }}
        >
          Empresa que realiza el contrato
        </Typography>
        <Box sx={{ padding: '10px 40px 0px 40px ' }}>
          <SelectCommon required label="Empresa" />
        </Box>
      </DialogContent>
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
        <ButtonCommon type="submit">GUARDAR</ButtonCommon>
      </Stack>
    </Dialog>
  );
}

export default NiceModal.create(PropuestasModalCreateOrUpdate);
