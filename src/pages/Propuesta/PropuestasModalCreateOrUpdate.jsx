/* eslint-disable camelcase */
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ActionCerrar from '../../components/ButtonsAction/ActionCerrar';
import SelectCommon from '../../components/SelectCommon';
import EstadosServices from '../../services/estadosServices';
import TextFieldCommon from '../../components/TextFieldCommon';
import ButtonCommon from '../../components/ButtonCommon';
import DatePickerCommon from '../../components/Datepicker';
import EmpresasServices from '../../services/EmpresasServices';
import InstitucionesServices from '../../services/InstitucionesServices';
import validationSchemeDataProuesta from './ValidationSchemeDataPropuesta';
import Loading from '../../components/Loading';
import PropuestasServices from '../../services/PropuestasServices';

function PropuestasModalCreateOrUpdate({ propuesta }) {
  const [info, setInfo] = useState(null);
  const [estados, setEstados] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [loading, setLoading] = useState(null);
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
  const modal = useModal();
  async function fechDataEmpresa() {
    try {
      setLoading(true);
      const response = await EmpresasServices.get();
      if (response.status === 200) {
        setEmpresas(
          response.data.data.map((item) => ({
            label: item.nombre,
            value: item.id
          }))
        );
        setLoading(false);
      }
    } catch (error) {
      setInfo({
        type: '',
        message: ''
      });
    } finally {
      setLoading(null);
    }
  }
  async function fechDataInstituciones() {
    try {
      setLoading(true);
      const response = await InstitucionesServices.get();
      if (response.status === 200) {
        setInstituciones(
          response.data.data.map((item) => ({
            label: item.nombre,
            value: item.id
          }))
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
  const handleSubmit = useCallback(
    async (values) => {
      const newPropuesta = { ...values };
      const Propuesta = {
        numero_propuesta: newPropuesta.numero_propuesta,
        tipo: newPropuesta.tipo.value,
        nombre: newPropuesta.nombre,
        fecha_inicial: newPropuesta.fecha_inicial,
        empresa_contratista_id: newPropuesta.empresaContratista.value,
        empresa_beneficiaria_id: newPropuesta.empresaBeneficiaria.value,
        estado_id: newPropuesta.estado.value,
        instituciones: newPropuesta.institucion_id
      };
      try {
        let response = null;

        if (propuesta) {
          response = await PropuestasServices.update({
            id: propuesta.id,
            ...Propuesta
          });
        } else {
          response = await PropuestasServices.post(Propuesta);
        }
        if (response.status === 200) {
          setInfo({
            type: 'success',
            message: response.message
          });
        }
      } catch (error) {
        setInfo({
          type: 'error',
          message: 'se ha producido un error, por favor intentelo más tarde.'
        });
      }
    },
    [propuesta]
  );
  useEffect(() => {
    if (propuesta !== undefined) {
      console.log(propuesta);
      setData({
        ...propuesta,
        numero_propuesta: propuesta.numero_propuesta,
        nombre: propuesta.nombre,
        fecha_inicial: propuesta.fecha_inicial,
        tipo: { label: propuesta.tipo, value: propuesta.tipo },
        empresaBeneficiaria: {
          label: propuesta.empresa_beneficiaria.nombre,
          value: propuesta.empresa_beneficiaria.nombre
        },
        estado: {
          label: propuesta.estados.name,
          value: propuesta.estados.id
        },
        empresaContratista: { label: propuesta.tipo, value: propuesta.tipo }
      });
    }

    fechDataEstados();
    fechDataEmpresa();
    fechDataInstituciones();
  }, [propuesta]);
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
        {propuesta ? 'Actualizar Contrato' : ' Crear Contrato'}
      </DialogTitle>
      <DialogContent>
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
                      modal.hide();
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
            handleSubmit(values);
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
              {formik.values.tipo.value === 'CONTRATO PAE' && (
                <Box sx={{ padding: '0px 40px 0px 40px ' }}>
                  <SelectCommon
                    options={instituciones}
                    required
                    value={formik.values.institucion_id}
                    isMulti
                    error={
                      formik.touched.institucion_id &&
                      formik.errors.institucion_id
                    }
                    label="Institucion"
                    onChange={(item) => {
                      formik.setFieldValue('institucion_id', item);
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
                <ButtonCommon type="submit">
                  {propuesta ? 'ACTUALIZAR' : 'GUARDAR'}
                </ButtonCommon>
              </Stack>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default NiceModal.create(PropuestasModalCreateOrUpdate);
