/* eslint-disable camelcase */
import { Alert, Box, Grid, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

import { useNavigate } from 'react-router-dom';
import ButtonCommon from '../../../components/ButtonCommon';
import DatePickerCommon from '../../../components/Datepicker';
import SelectCommon from '../../../components/SelectCommon';
import TextFieldCommon from '../../../components/TextFieldCommon';
import GenerosServices from '../../../services/GenerosServices';
import NivelesEstudiosServices from '../../../services/NivelesEstudiosServices';
import TiposDocumentosServices from '../../../services/TiposDocumentosServices';
import validationDataEmployes from '../ValidationSchemeDataEmployes';
import Loading from '../../../components/Loading';

function FormDataIndentification({ data, next, setData }) {
  const [generos, setGeneros] = useState([]);
  const [estudios, setEstudios] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  async function fechDataTiposDocumentos() {
    try {
      setLoading(true);
      const response = await TiposDocumentosServices.get();
      if (response.status === 200) {
        setDocumentos(
          response.data.map((item) => ({ label: item.name, value: item.id }))
        );
        setLoading(false);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    } finally {
      setLoading(null);
    }
  }
  async function fechDataNivelEstudios() {
    try {
      setLoading(true);
      const response = await NivelesEstudiosServices.get();
      if (response.status === 200) {
        setEstudios(
          response.data.map((item) => ({ label: item.name, value: item.id }))
        );
        setLoading(false);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    } finally {
      setLoading(null);
    }
  }
  async function fechDataGeneros() {
    try {
      setLoading(true);
      const response = await GenerosServices.get();
      if (response.status === 200) {
        setGeneros(
          response.data.map((item) => ({ label: item.name, value: item.id }))
        );
        setLoading(false);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    } finally {
      setLoading(null);
    }
  }
  useEffect(() => {
    fechDataTiposDocumentos();
    fechDataNivelEstudios();
    fechDataGeneros();
  }, []);
  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <Box sx={{ padding: '10px 40px 0px 40px ' }}>
          {info && (
            <Alert
              severity={info.type}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setInfo(null);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {info.message}
            </Alert>
          )}
        </Box>
      )}

      <Formik
        validationSchema={validationDataEmployes}
        enableReinitialize
        initialValues={
          data || {
            tipo_identificacion_id: '',
            identificacion: '',
            fecha_expedicion_documento: '',
            nombres: '',
            apellidos: '',
            numero_telefono: '',
            genero_id: '',
            email: '',
            fecha_nacimiento: '',
            ocupacion: '',
            nivel_escolaridad_id: '',
            direccion: ''
          }
        }
        onSubmit={(values) => {
          setData(values);
          next();
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
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
                  <SelectCommon
                    options={documentos}
                    required
                    value={formik.values.tipo_identificacion_id}
                    error={
                      formik.touched.tipo_identificacion_id &&
                      formik.errors.tipo_identificacion_id
                    }
                    onChange={(tipo_identificacion_id) => {
                      formik.setFieldValue(
                        'tipo_identificacion_id',
                        tipo_identificacion_id
                      );
                    }}
                    label="Tipo de documentación"
                  />
                </Grid>
                <Grid item lg={4}>
                  <TextFieldCommon
                    error={
                      formik.touched.identificacion &&
                      formik.errors.identificacion
                    }
                    name="identificacion"
                    value={formik.values.identificacion}
                    onChange={formik.handleChange}
                    required
                    label="Número de identificación"
                  />
                </Grid>
                <Grid item lg={4}>
                  <DatePickerCommon
                    value={formik.values.fecha_expedicion_documento}
                    error={
                      formik.touched.fecha_expedicion_documento &&
                      formik.errors.fecha_expedicion_documento
                    }
                    onChange={(value) => {
                      formik.setFieldValue(
                        'fecha_expedicion_documento',
                        format(value, 'yyyy-MM-dd')
                      );
                    }}
                    required
                    label="Fecha de Expedición"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container direction="row" spacing={2} marginBottom={2}>
                <Grid item lg={4}>
                  <TextFieldCommon
                    error={formik.touched.nombres && formik.errors.nombres}
                    name="nombres"
                    value={formik.values.nombres}
                    onChange={formik.handleChange}
                    required
                    label="Nombres"
                  />
                </Grid>
                <Grid item lg={4}>
                  <TextFieldCommon
                    error={formik.touched.apellidos && formik.errors.apellidos}
                    name="apellidos"
                    value={formik.values.apellidos}
                    onChange={formik.handleChange}
                    required
                    label="Apellidos"
                  />
                </Grid>
                <Grid item lg={4}>
                  <SelectCommon
                    options={estudios}
                    required
                    value={formik.values.nivel_escolaridad_id}
                    error={
                      formik.touched.nivel_escolaridad_id &&
                      formik.errors.nivel_escolaridad_id
                    }
                    onChange={(nivel_escolaridad_id) => {
                      formik.setFieldValue(
                        'nivel_escolaridad_id',
                        nivel_escolaridad_id
                      );
                    }}
                    label="Nivel de escolaridad"
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Grid container direction="row" spacing={2} marginBottom={2}>
                <Grid item lg={4}>
                  <SelectCommon
                    options={generos}
                    required
                    value={formik.values.genero_id}
                    error={formik.touched.genero_id && formik.errors.genero_id}
                    onChange={(genero_id) => {
                      formik.setFieldValue('genero_id', genero_id);
                    }}
                    label="Genero"
                  />
                </Grid>
                <Grid item lg={4}>
                  <TextFieldCommon
                    error={formik.touched.email && formik.errors.email}
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    required
                    label="Correo electronico"
                  />
                </Grid>
                <Grid item lg={4}>
                  <DatePickerCommon
                    value={formik.values.fecha_nacimiento}
                    error={
                      formik.touched.fecha_nacimiento &&
                      formik.errors.fecha_nacimiento
                    }
                    onChange={(value) => {
                      formik.setFieldValue(
                        'fecha_nacimiento',
                        format(value, 'yyyy-MM-dd')
                      );
                    }}
                    required
                    label="Fecha de Nacimiento"
                  />
                </Grid>
              </Grid>
            </Box>
            <Typography
              sx={{
                padding: '0px 0px 10px 0px  ',
                fontSize: '18px',
                color: '#6D66CC'
              }}
            >
              Datos de ubicación
            </Typography>
            <Box>
              <Grid container direction="row" spacing={2} marginBottom={2}>
                <Grid item lg={4}>
                  <TextFieldCommon
                    error={formik.touched.ocupacion && formik.errors.ocupacion}
                    name="ocupacion"
                    value={formik.values.ocupacion}
                    onChange={formik.handleChange}
                    required
                    label="Ocupación"
                  />
                </Grid>
                <Grid item lg={4}>
                  <TextFieldCommon
                    error={
                      formik.touched.numero_telefono &&
                      formik.errors.numero_telefono
                    }
                    name="numero_telefono"
                    value={formik.values.numero_telefono}
                    onChange={formik.handleChange}
                    required
                    label="Número de telefono"
                  />
                </Grid>
                <Grid item lg={4}>
                  <TextFieldCommon
                    error={formik.touched.direccion && formik.errors.direccion}
                    name="direccion"
                    value={formik.values.direccion}
                    onChange={formik.handleChange}
                    required
                    label="Dirección de residencia"
                  />
                </Grid>
              </Grid>
            </Box>
            <Stack
              spacing={2}
              direction="row"
              sx={{ padding: '10px', justifyContent: 'center' }}
            >
              <ButtonCommon
                type="button"
                variant="outlined"
                onClick={() => {
                  navigate('/gestion/empleados');
                }}
              >
                CANCELAR
              </ButtonCommon>
              <ButtonCommon type="submit" onClick={() => {}}>
                CONTINUAR
              </ButtonCommon>
            </Stack>
          </form>
        )}
      </Formik>
    </>
  );
}

export default FormDataIndentification;
