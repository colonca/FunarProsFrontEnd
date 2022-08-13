/* eslint-disable camelcase */
import { Stack } from '@mui/material';
import React, { useMemo, useState, useEffect } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs';

import Tabs from '../../components/Tabs';
import 'react-dropzone-uploader/dist/styles.css';
import FormDataIndentification from './components/FormDataIndentification';
import FormDataDocuments from './components/FormDataDocuments';

function EmpleadosCreateOrUpdate({ empleado }) {
  const [data, setData] = useState(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (empleado !== undefined) {
      setData({
        ...empleado,
        tipo_identificacion_id: {
          label: empleado.documento.name,
          value: empleado.documento.id
        },
        identificacion: empleado.identificacion,
        fecha_expedicion_documento: empleado.fecha_expedicion_documento,
        nombres: empleado.nombres,
        apellidos: empleado.apellidos,
        numero_telefono: empleado.numero_telefono,
        genero_id: { label: empleado.genero.name, value: empleado.genero.id },
        email: empleado.email,
        fecha_nacimiento: empleado.fecha_nacimiento,
        ocupacion: empleado.ocupacion,
        nivel_escolaridad_id: {
          label: empleado.escolaridad.name,
          value: empleado.escolaridad.id
        },
        direccion: empleado.direcion,
        soporte_documento: empleado.soporte_documento
      });
    }
  }, [empleado]);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Gestión', url: '/' },
      { title: 'Crear empleado', url: '/gestion/empleados/crear' }
    ],
    []
  );
  const tabs = useMemo(
    () => [
      { title: 'Información del empleado' },
      { title: 'Cargue de documentos del empleado' }
    ],
    []
  );

  return (
    <Stack sx={{ margin: '0px 60px' }}>
      <BreadCrumbs items={breadCrumbs} />
      <Tabs items={tabs} step={step} />
      {step === 0 && (
        <FormDataIndentification
          data={data}
          setData={setData}
          next={() => {
            setStep(1);
          }}
        />
      )}
      {step === 1 && (
        <FormDataDocuments
          data={data}
          setData={setData}
          back={() => {
            setStep(0);
          }}
        />
      )}
    </Stack>
  );
}

export default EmpleadosCreateOrUpdate;
