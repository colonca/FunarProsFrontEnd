/* eslint-disable camelcase */
import React, { useMemo, useState, useEffect } from 'react';
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
import ActionCerrar from '../../components/ButtonsAction/ActionCerrar';
import SelectCommon from '../../components/SelectCommon';
import EstadosServices from '../../services/estadosServices';
import TextFieldCommon from '../../components/TextFieldCommon';
import ButtonCommon from '../../components/ButtonCommon';
import DatePickerCommon from '../../components/Datepicker';
import EmpresasServices from '../../services/EmpresasServices';
import InstitucionesServices from '../../services/InstitucionesServices';
import validationSchemeDataProuesta from './ValidationSchemeDataPropuesta';

function PropuestasModalCreateOrUpdate() {
  const [info, setInfo] = useState(null);
  const [estados, setEstados] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [data, setData] = useState(null);
  async function fechDataEstados() {
    try {
      const response = await EstadosServices.get();
      if (response.status === 200) {
        setEstados(
          response.data.map((item) => ({ label: item.name, value: item.id }))
        );
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
  const tiposContratos = useMemo(
    () => [
      { label: 'CONTRATO PAE', value: 'PAE' },
      { label: 'CONTRATO OBRAS', value: 'OBRAS' }
    ],
    []
  );
  const user = useMemo(() => [
    { label: 'Admi', value: 'admi' },
    { label: 'Admi', value: 'admi' }
  ]);
  const modal = useModal();
  async function fechDataEmpresa() {
    try {
      const response = await EmpresasServices.get();
      if (response.status === 200) {
        setEmpresas(
          response.data.data.map((item) => ({
            label: item.nombre,
            value: item.id
          }))
        );
      }
    } catch (error) {
      setInfo({
        type: '',
        message: ''
      });
    }
  }
  async function fechDataInstituciones() {
    try {
      const response = await InstitucionesServices.get();
      if (response.status === 200) {
        setInstituciones(
          response.data.data.map((item) => ({
            label: item.nombre,
            value: item.id
          }))
        );
      }
    } catch (error) {
      setInfo({
        type: '',
        message: ''
      });
    }
  }
  useEffect(() => {
    fechDataEstados();
    fechDataEmpresa();
    fechDataInstituciones();
  }, []);
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
        <Formik
          validationSchema={validationSchemeDataProuesta}
          enableReinitialize
          initialValues={
            data || {
              empresaBeneficiaria: '',
              empresaContratista: '',
              numero_propuesta: '',
              nombre: '',
              estado: '',
              fecha_inicial: '',
              tipo: '',
              institucion_id: ''
            }
          }
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            resetForm();
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Typography
                sx={{
                  fontSize: '16px',
                  padding: '0px 30px',
                  margin: '0px 10px',
                  color: '#6D66CC'
                }}
              >
                Empresa Beneficiaria.
              </Typography>
              <Box sx={{ padding: '0px 40px 10px 40px ' }}>
                <SelectCommon
                  options={empresas}
                  value={formik.values.empresaBeneficiaria}
                  error={
                    formik.touched.empresaBeneficiaria &&
                    formik.errors.empresaBeneficiaria
                  }
                  required
                  label="Empresa"
                  onChange={(empresaBeneficiaria) => {
                    formik.setFieldValue(
                      'empresaBeneficiaria',
                      empresaBeneficiaria
                    );
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: '16px',
                  padding: '0px 30px',
                  margin: '0px 10px',
                  color: '#6D66CC'
                }}
              >
                Empresa contratista
              </Typography>
              <Box sx={{ padding: '0px 40px 0px 40px ' }}>
                <SelectCommon
                  options={empresas}
                  value={formik.values.empresaContratista}
                  error={
                    formik.touched.empresaContratista &&
                    formik.errors.empresaContratista
                  }
                  required
                  label="Empresa"
                  onChange={(empresaContratista) => {
                    formik.setFieldValue(
                      'empresaContratista',
                      empresaContratista
                    );
                  }}
                />
              </Box>
              <Box sx={{ padding: '10px 40px 0px 40px ' }}>
                <Grid container direction="row" spacing={2} marginBottom={2}>
                  <Grid item lg={4}>
                    <TextFieldCommon
                      required
                      value={formik.values.numero_propuesta}
                      name="numero_propuesta"
                      error={
                        formik.touched.numero_propuesta &&
                        formik.errors.numero_propuesta
                      }
                      label="Número del contrato"
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item lg={8}>
                    <TextFieldCommon
                      required
                      value={formik.values.nombre}
                      error={formik.touched.nombre && formik.errors.nombre}
                      onChange={formik.handleChange}
                      name="nombre"
                      label="Nombre del contrato"
                    />
                  </Grid>
                </Grid>
                <Grid container direction="row" spacing={2} marginBottom={2}>
                  <Grid item lg={4}>
                    <SelectCommon
                      options={tiposContratos}
                      required
                      value={formik.values.tipo}
                      error={formik.touched.tipo && formik.errors.tipo}
                      label="Tipo de contrato"
                      onChange={(tipo) => {
                        formik.setFieldValue('tipo', tipo);
                      }}
                    />
                  </Grid>
                  <Grid item lg={4}>
                    <DatePickerCommon
                      error={
                        formik.touched.fecha_inicial &&
                        formik.errors.fecha_inicial
                      }
                      value={formik.values.fecha_inicial}
                      required
                      label="Fecha Inicial"
                      onChange={(fecha) => {
                        formik.setFieldValue('fecha_inicial', fecha);
                      }}
                    />
                  </Grid>
                  <Grid item lg={4}>
                    <SelectCommon
                      options={estados}
                      value={formik.values.estado}
                      required
                      error={formik.touched.estado && formik.errors.estado}
                      label="Estado"
                      onChange={(estado) => {
                        formik.setFieldValue('estado', estado);
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              {formik.values.tipo.value === 'PAE' && (
                <Box sx={{ padding: '0px 40px 0px 40px ' }}>
                  <SelectCommon
                    options={instituciones}
                    required
                    error={
                      formik.touched.institucion_id &&
                      formik.errors.institucion_id
                    }
                    value={formik.values.institucion_id}
                    label="Institucion"
                    onChange={(institucion) => {
                      formik.setFieldValue('institucion_id', institucion);
                    }}
                  />
                </Box>
              )}

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
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default NiceModal.create(PropuestasModalCreateOrUpdate);
