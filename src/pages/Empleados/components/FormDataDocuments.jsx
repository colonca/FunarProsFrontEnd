import { Box, Stack } from '@mui/material';
import { Formik } from 'formik';

import React, { useCallback, useState } from 'react';

import ButtonCommon from '../../../components/ButtonCommon';
import Dropzone from '../../../components/Dropzone';
import EmpleadosServices from '../../../services/EmpleadosServices';
import validationDataDocuments from '../ValidationSchemeDataDocuments';

function FormDataDocuments({ data, back, setData }) {
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
      soporte_documento: newEmpleado.soporte_documento
    };
    try {
      let response = null;

      if (newEmpleado) {
        response = await EmpleadosServices.update({
          id: newEmpleado.id,
          ...Empleado
        });
      } else {
        response = await EmpleadosServices.post(Empleado);
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
  }, []);

  return (
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
            <ButtonCommon type="submit">GUARDAR</ButtonCommon>
          </Stack>
        </form>
      )}
    </Formik>
  );
}

export default FormDataDocuments;
