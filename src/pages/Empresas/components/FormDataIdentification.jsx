/* eslint-disable camelcase */
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
// import CloseIcon from '@mui/icons-material/Close';
// import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ButtonCommon from '../../../components/ButtonCommon';
import DatePickerCommon from '../../../components/Datepicker';

import SelectCommon from '../../../components/SelectCommon';
import TextFieldCommon from '../../../components/TextFieldCommon';
import DepartamentosServices from '../../../services/DepartamentosServices';
import MunicipiosServices from '../../../services/MunicipiosServices';
import TiposEmpresasServices from '../../../services/TiposEmpresasServices';
import validationDataEmpresa from '../ValidationSchemeDataEmpresas';

function FormDataIdentification({ data, next, setData }) {
  const navigate = useNavigate();
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [tipos, setTipos] = useState([]);
  async function fechDataDepartamentos() {
    try {
      // 7setLoading(true);
      const response = await DepartamentosServices.get();
      if (response.status === 200) {
        setDepartamentos(
          response.data.map((item) => ({ label: item.name, value: item.id }))
        );
        // setLoading(false);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    } finally {
      // setLoading(null);
    }
  }
  async function fechDataMunicipios(id) {
    try {
      const response = await MunicipiosServices.get(id);
      if (response.status === 200) {
        setMunicipios(
          response.data.map((item) => ({ label: item.name, value: item.id }))
        );
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
  async function fechDataTiposEmpresas() {
    try {
      const response = await TiposEmpresasServices.get();
      if (response.status === 200) {
        setTipos(
          response.data.map((item) => ({ label: item.name, value: item.id }))
        );
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
    fechDataTiposEmpresas();
    fechDataDepartamentos();
  }, []);
  return (
    <Formik
      validationSchema={validationDataEmpresa}
      enableReinitialize
      initialValues={
        data || {
          departamento: '',
          municipio_id: '',
          tipo_id: '',
          email: '',
          numero_telefono: '',
          nombre: '',
          nit: '',
          fecha_convenio: ''
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
            Datos de ubicación
          </Typography>
          <Box>
            <Grid container direction="row" spacing={2} marginBottom={2}>
              <Grid item lg={6}>
                <SelectCommon
                  required
                  label="Departamento"
                  options={departamentos}
                  value={formik.values.departamento}
                  error={
                    formik.touched.departamento && formik.errors.departamento
                  }
                  onChange={(departamento) => {
                    formik.setFieldValue('departamento', departamento);
                    fechDataMunicipios(departamento.value);
                  }}
                />
              </Grid>
              <Grid item lg={6}>
                <SelectCommon
                  required
                  label="Municipio"
                  options={municipios}
                  error={
                    formik.touched.municipio_id && formik.errors.municipio_id
                  }
                  value={formik.values.municipio_id}
                  onChange={(municipio_id) => {
                    formik.setFieldValue('municipio_id', municipio_id);
                  }}
                />
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
            Datos de identificación
          </Typography>
          <Box>
            <Grid container direction="row" spacing={2} marginBottom={2}>
              <Grid item lg={4}>
                <TextFieldCommon
                  required
                  label="Nit"
                  error={formik.touched.nit && formik.errors.nit}
                  name="nit"
                  value={formik.values.nit}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item lg={4}>
                <TextFieldCommon
                  required
                  label="Nombre"
                  error={formik.touched.nombre && formik.errors.nombre}
                  name="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item lg={4}>
                <SelectCommon
                  options={tipos}
                  required
                  value={formik.values.tipo_id}
                  error={formik.touched.tipo_id && formik.errors.tipo_id}
                  onChange={(tipo_id) => {
                    formik.setFieldValue('tipo_id', tipo_id);
                  }}
                  label="Tipo de empresa"
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container direction="row" spacing={2} marginBottom={2}>
              <Grid item lg={4}>
                <TextFieldCommon
                  required
                  label="Correo electronico"
                  error={formik.touched.email && formik.errors.email}
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
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
                <DatePickerCommon
                  required
                  label="Fecha de convenio"
                  value={formik.values.fecha_convenio}
                  error={
                    formik.touched.fecha_convenio &&
                    formik.errors.fecha_convenio
                  }
                  onChange={(value) => {
                    formik.setFieldValue(
                      'fecha_convenio',
                      format(value, 'yyyy-MM-dd')
                    );
                  }}
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
                navigate('/gestion/empresas');
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
  );
}

export default FormDataIdentification;
