import React, { useMemo, useState, useEffect, useCallback } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Formik } from 'formik';
import {
  Alert,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import validationInstitucion from './ValidationScheme';
import TextFieldCommon from '../../components/TextFieldCommon';
import SelectCommon from '../../components/SelectCommon';
import DatePickerCommon from '../../components/Datepicker';
import ButtonCommon from '../../components/ButtonCommon';
import ActionCerrar from '../../components/ButtonsAction/ActionCerrar';
import DepartamentosServices from '../../services/DepartamentosServices';
import MunicipiosServices from '../../services/MunicipiosServices';
import InstitucionesServices from '../../services/InstitucionesServices';
import Loading from '../../components/Loading';

function InstitucionesCreateModal({ institucion }) {
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (institucion !== undefined) {
      setData({
        ...institucion,
        nit: institucion.identificacion,
        nombres: institucion.nombre,
        fechaConvenio: institucion.inicio_convenio,
        municipio: { label: institucion.term.name, value: institucion.term.id },
        departamento: {
          label: institucion.term.parent.name,
          value: institucion.term.parent.id
        },
        tipo: { label: institucion.tipo, value: institucion.tipo }
      });
    }
  }, [institucion]);

  const handleSubmit = useCallback(
    async (values) => {
      const newInstitucion = { ...values };
      const Institucion = {
        identificacion: newInstitucion.nit,
        telefono: newInstitucion.telefono,
        nombre: newInstitucion.nombres,
        email: newInstitucion.email,
        inicio_convenio: newInstitucion.fechaConvenio,
        tipo: newInstitucion.tipo.value,
        term_id: newInstitucion.municipio.value
      };
      try {
        let response = null;

        if (institucion) {
          response = await InstitucionesServices.update({
            id: institucion.id,
            ...Institucion
          });
        } else {
          response = await InstitucionesServices.post(Institucion);
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
    [institucion]
  );

  async function fechDataDepartamentos() {
    try {
      setLoading(true);
      const response = await DepartamentosServices.get();
      if (response.status === 200) {
        setDepartamentos(
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

  useEffect(() => {
    fechDataDepartamentos();
  }, []);
  const tipos = useMemo(
    () => [
      { label: 'PUBLICA', value: 'PUBLICO' },
      { label: 'PRIVADA', value: 'PRIVADO' }
    ],
    []
  );
  const modal = useModal();
  return (
    <Dialog
      fullScreen={false}
      maxWidth="lg"
      fullWidth={false}
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
        Crear instituciones
      </DialogTitle>
      <DialogContent sx={{ padding: '10px' }}>
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
          validationSchema={validationInstitucion}
          enableReinitialize
          initialValues={
            data || {
              nit: '',
              telefono: '',
              fechaConvenio: '',
              nombres: '',
              tipo: '',
              email: '',
              departamento: '',
              municipio: ''
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
                Datos de ubicación
              </Typography>
              <Box sx={{ padding: '10px 40px 0px 40px ' }}>
                <Grid container direction="row" spacing={2} marginBottom={2}>
                  <Grid item lg={6}>
                    <SelectCommon
                      options={departamentos}
                      required
                      value={formik.values.departamento}
                      error={
                        formik.touched.departamento &&
                        formik.errors.departamento
                      }
                      label="Departamento"
                      onChange={(departamento) => {
                        formik.setFieldValue('departamento', departamento);
                        fechDataMunicipios(departamento.value);
                      }}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <SelectCommon
                      options={municipios}
                      required
                      label="Municipio"
                      error={
                        formik.touched.municipio && formik.errors.municipio
                      }
                      value={formik.values.municipio}
                      onChange={(municipio) => {
                        formik.setFieldValue('municipio', municipio);
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ padding: '10px 40px 20px 40px ' }}>
                <Divider sx={{ height: '1px', backgroundColor: '#6D66CC' }} />
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
                  <Grid item lg={3}>
                    <TextFieldCommon
                      label="N° de  NIT"
                      error={formik.touched.nit && formik.errors.nit}
                      name="nit"
                      value={formik.values.nit}
                      onChange={formik.handleChange}
                      required
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <TextFieldCommon
                      name="telefono"
                      value={formik.values.telefono}
                      error={formik.touched.telefono && formik.errors.telefono}
                      onChange={formik.handleChange}
                      label="N° de Telefono"
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <DatePickerCommon
                      value={formik.values.fechaConvenio}
                      error={
                        formik.touched.fechaConvenio &&
                        formik.errors.fechaConvenio
                      }
                      onChange={(value) => {
                        formik.setFieldValue('fechaConvenio', value);
                      }}
                      required
                      label="Fecha de convenio"
                    />
                  </Grid>
                  <Grid item lg={3}>
                    <SelectCommon
                      value={formik.values.tipo}
                      error={formik.touched.tipo && formik.errors.tipo}
                      options={tipos}
                      onChange={(tipo) => {
                        formik.setFieldValue('tipo', tipo);
                      }}
                      required
                      label="Tipo"
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextFieldCommon
                      name="nombres"
                      value={formik.values.nombres}
                      error={formik.touched.nombres && formik.errors.nombres}
                      onChange={formik.handleChange}
                      required
                      label="Nombres"
                    />
                  </Grid>

                  <Grid item lg={6}>
                    <TextFieldCommon
                      type="email"
                      name="email"
                      value={formik.values.email}
                      error={formik.touched.email && formik.errors.email}
                      onChange={formik.handleChange}
                      required
                      label="Correo Electronico"
                    />
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
                <ButtonCommon type="submit">GUARDAR</ButtonCommon>
              </Stack>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
export default NiceModal.create(InstitucionesCreateModal);
