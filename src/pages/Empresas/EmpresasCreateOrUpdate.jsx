import { Stack } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tabs from '../../components/Tabs';
import BreadCrumbs from '../../components/BreadCrumbs';
import FormDataDocuments from './components/FormDataDocuments';
import FormDataIdentification from './components/FormDataIdentification';
import EmpresasServices from '../../services/EmpresasServices';

function EmpresasCreateOrUpdate() {
  const [data, setData] = useState(null);
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState(null);
  const { id } = useParams();
  const fechaDataEmpresaId = useCallback(async () => {
    try {
      const response = await EmpresasServices.getId(id);
      if (response.status === 200) {
        setData({
          id: response.data.id,
          departamento: {
            label: response.data.term.parent.name,
            value: response.data.term.parent.id
          },
          municipio_id: {
            label: response.data.term.name,
            value: response.data.term.id
          },
          nit: response.data.nit,
          nombre: response.data.nombre,
          tipo_id: {
            label: response.data.tipos.name,
            value: response.data.tipos.id
          },
          email: response.data.email,
          telefono: response.data.telefono,
          fecha_convenio: response.data.fecha_convenio,
          direccion: response.data.direccion
        });
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    }
  }, [id]);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Gestión', url: '/' },
      { title: 'Crear empresa', url: '/gestion/empresa/crear' }
    ],
    []
  );
  const tabs = useMemo(
    () => [
      { title: 'Información de la empresa' },
      { title: 'Cargue de documentos de la  empresa' }
    ],
    []
  );
  useEffect(() => {
    if (id) {
      fechaDataEmpresaId();
    }
  }, [fechaDataEmpresaId, id]);
  return (
    <Stack sx={{ margin: '0px 60px' }}>
      <BreadCrumbs items={breadCrumbs} />
      <Tabs items={tabs} step={step} />
      {step === 0 && (
        <FormDataIdentification
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

export default EmpresasCreateOrUpdate;
