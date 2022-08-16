import { Box, Stack } from '@mui/material';
import { Formik } from 'formik';
import React, { useCallback, useState } from 'react';

import { useModal } from '@ebay/nice-modal-react';
import { useNavigate } from 'react-router-dom';
import ButtonCommon from '../../../components/ButtonCommon';
import Dropzone from '../../../components/Dropzone';
import EmpleadosServices from '../../../services/EmpleadosServices';
import validationDataDocuments from '../ValidationSchemeDataDocuments';
import ModalUpdate from '../../../components/ModalUpdate';

function FormDataDocuments({ data, back, setData }) {
  const updateModal = useModal(ModalUpdate);
  const navigate = useNavigate();
  const [info, setInfo] = useState();

  const handleSubmit = useCallback(async (request) => {
    const newEmpleado = { ...request };

    const Empleado = {
      tipo_identificacion_id: newEmpleado.tipo_identificacion_id.value,
      identificacion: newEmpleado.identificacion,
      fecha_expedicion_documento: newEmpleado.fecha_expedicion_documento,
      nombres: newEmpleado.nombres,
      apellidos: newEmpleado.apellidos,
      numero_telefono: newEmpleado.numero_telefono,
      genero_id: newEmpleado.genero_id.value,
      email: newEmpleado.email,
      fecha_nacimiento: newEmpleado.fecha_nacimiento,
      ocupacion: newEmpleado.ocupacion,
      nivel_escolaridad_id: newEmpleado.nivel_escolaridad_id.value,
      direccion: newEmpleado.direccion,
      soporte_documento:
        typeof newEmpleado.soporte_documento === 'object'
          ? newEmpleado.soporte_documento
          : undefined
    };
    try {
      let response = null;
      if (newEmpleado.id) {
        response = await EmpleadosServices.update({
          id: newEmpleado.id,
          ...Empleado
        });
      } else {
        response = await EmpleadosServices.post(Empleado);
      }
      if (response.status === 200) {
        if (newEmpleado.id) {
          updateModal
            .show({ type: 'success', message: response.message })
            .then(() => {
              updateModal.hide();
              navigate('/gestion/empleados');
            });
        }
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
  }, []);

  return (
    <>
      <Box sx={{ padding: '10px 40px 0px 40px ' }} />
      <Formik
        validationSchema={validationDataDocuments}
        enableReinitialize
        initialValues={
          data || {
            soporte_documento: ''
          }
        }
        onSubmit={(values) => {
          const request = { ...data, ...values };
          handleSubmit(request);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {JSON.stringify(formik.errors)}
            <Box sx={{ padding: '30px' }}>
              <Dropzone
                accept=".pdf"
                file={formik.values.soporte_documento}
                onFileUpload={(file) => {
                  formik.setFieldValue('soporte_documento', file);
                }}
              />
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
                  setData((state) => ({ ...state, ...formik.values }));
                  back();
                }}
              >
                ATRAS
              </ButtonCommon>
              <ButtonCommon type="submit">
                {data.id ? 'ACTUALIZAR' : 'GUARDAR'}
              </ButtonCommon>
            </Stack>
          </form>
        )}
      </Formik>
    </>
  );
}

export default FormDataDocuments;
