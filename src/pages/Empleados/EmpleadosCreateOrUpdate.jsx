import {
  Box,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography
} from '@mui/material';
import { Formik } from 'formik';
import React, { useMemo, useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import BreadCrumbs from '../../components/BreadCrumbs';
import ButtonCommon from '../../components/ButtonCommon';
import DatePickerCommon from '../../components/Datepicker';
import SelectCommon from '../../components/SelectCommon';
import Cell from '../../components/Table/Cell';
import Row from '../../components/Table/Row';
import Tabs from '../../components/Tabs';
import TextFieldCommon from '../../components/TextFieldCommon';
import ButtonDelete from '../../components/ButtonsAction/ActionDelete';
import ButtonEdit from '../../components/ButtonsAction/ActionEdit';
import ButtonView from '../../components/ButtonsAction/ActionView';
import FileUploadModal from '../../components/FileUploadModal';

function EmpleadosCreateOrUpdate() {
  const modal = useModal(FileUploadModal);
  const [step, setStep] = useState(0);
  const controlStep = () => {
    setStep((steps) => steps + 1);
  };
  const breadCrumbs = useMemo(
    () => [
      { title: 'Gestión', url: '/' },
      { title: 'Crear empleado', url: '/gestion/empleados/crear' }
    ],
    []
  );
  const tabs = useMemo(
    () => [
      { title: 'Información de la empresa' },
      { title: 'Cargue de documentos de la empresa' }
    ],
    []
  );
  return (
    <Stack sx={{ margin: '0px 60px' }}>
      <BreadCrumbs items={breadCrumbs} />

      <Formik
        validationSchema
        enableReinitialize
        initialValues
        onSubmit={() => {}}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Tabs items={tabs} step={step} />
            {step === 0 && (
              <section>
                <Typography
                  sx={{
                    padding: '10px 0px 10px 0px  ',
                    fontSize: '18px',
                    color: '#6D66CC'
                  }}
                >
                  Datos de identificación
                </Typography>
                <Box>
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
                  </Grid>
                </Box>
                <Box>
                  <Grid container direction="row" spacing={2} marginBottom={2}>
                    <Grid item lg={4}>
                      <TextFieldCommon required label="Nombres" />
                    </Grid>
                    <Grid item lg={4}>
                      <TextFieldCommon required label="Apellidos" />
                    </Grid>
                    <Grid item lg={4}>
                      <TextFieldCommon required label="Número de telefono" />
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Grid container direction="row" spacing={2} marginBottom={2}>
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
                    padding: '10px 0px 10px 0px  ',
                    fontSize: '18px',
                    color: '#6D66CC'
                  }}
                >
                  Datos de ubicación
                </Typography>
                <Box>
                  <Grid container direction="row" spacing={2} marginBottom={2}>
                    <Grid item lg={4}>
                      <TextFieldCommon required label="Ocupación" />
                    </Grid>
                    <Grid item lg={4}>
                      <SelectCommon required label="Nivel de escolaridad" />
                    </Grid>
                    <Grid item lg={4}>
                      <TextFieldCommon
                        required
                        label="Dirección de residencia"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </section>
            )}
            {step === 1 && (
              <section>
                <Stack
                  direction="row"
                  sx={{ margin: '10px', justifyContent: 'flex-end' }}
                >
                  <ButtonCommon
                    onClick={() => {
                      modal.show();
                    }}
                  >
                    AGREGAR
                  </ButtonCommon>
                </Stack>
                <Stack>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <Row>
                          <Cell>Nombres</Cell>
                          <Cell>Acciones</Cell>
                        </Row>
                      </TableHead>
                      <TableBody>
                        <Row>
                          <Cell />
                          <Cell>
                            <ButtonView onClick={() => {}} />
                            <ButtonEdit onClick={() => {}} />
                            <ButtonDelete onClick={() => {}} />
                          </Cell>
                        </Row>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
              </section>
            )}
            <Stack
              spacing={2}
              direction="row"
              sx={{ margin: '20px', justifyContent: 'center' }}
            >
              <ButtonCommon type="button" variant="outlined" onClick={() => {}}>
                CANCELAR
              </ButtonCommon>
              <ButtonCommon onClick={controlStep} type="submit">
                CONTINUAR
              </ButtonCommon>
            </Stack>
          </form>
        )}
      </Formik>
    </Stack>
  );
}

export default EmpleadosCreateOrUpdate;
