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
import { Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import ButtonCommon from '../../components/ButtonCommon';
import ActionCerrar from '../../components/ButtonsAction/ActionCerrar';
import DatePickerCommon from '../../components/Datepicker';
import SelectCommon from '../../components/SelectCommon';
import Tabs from '../../components/Tabs';
import TextFieldCommon from '../../components/TextFieldCommon';

function EmpleadosCreateOrUpdateModal() {
  const modal = useModal();
  const [tabs, setTabs] = useState(null);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Informacion de la empresa', url: '/' },
      { title: 'Cargue de documentos', url: '/gestion/empleados' }
    ],
    []
  );
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
      <DialogTitle sx={{ padding: '10px', margin: '10px 0px 0px 54px' }}>
        Crear Empleados
      </DialogTitle>
      <DialogContent>
        <Formik
          validationSchema
          enableReinitialize
          initialValues
          onSubmit={() => {}}
        >
          {() => (
            <form>
              <Tabs items={breadCrumbs} />
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
                    <SelectCommon required label="Tipo de documentación" />
                  </Grid>
                  <Grid item lg={4}>
                    <TextFieldCommon
                      required
                      label="Número de identificación"
                    />
                  </Grid>
                  <Grid item lg={4}>
                    <DatePickerCommon required label="Fecha de Expedición" />
                  </Grid>
                  <Grid item lg={4}>
                    <TextFieldCommon required label="Nombres" />
                  </Grid>
                  <Grid item lg={4}>
                    <TextFieldCommon required label="Apellidos" />
                  </Grid>
                  <Grid item lg={4}>
                    <TextFieldCommon required label="Número de telefono" />
                  </Grid>
                  <Grid item lg={4}>
                    <SelectCommon required label="Genero" />
                  </Grid>
                  <Grid item lg={4}>
                    <TextFieldCommon required label="Correo electronico" />
                  </Grid>
                  <Grid item lg={4}>
                    <DatePickerCommon required label="Fecha de Nacimiento" />
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
                    <TextFieldCommon required label="Ocupación" />
                  </Grid>
                  <Grid item lg={4}>
                    <SelectCommon required label="Nivel de escolaridad" />
                  </Grid>
                  <Grid item lg={4}>
                    <TextFieldCommon required label="Dirección de residencia" />
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
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default NiceModal.create(EmpleadosCreateOrUpdateModal);
