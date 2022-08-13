import { Stack } from '@mui/material';
import React, { useMemo, useState } from 'react';
import Tabs from '../../components/Tabs';
import BreadCrumbs from '../../components/BreadCrumbs';
import FormDataDocuments from './components/FormDataDocuments';
import FormDataIdentification from './components/FormDataIdentification';

function EmpresasCreateOrUpdate() {
  const [data, setData] = useState(null);
  const [step, setStep] = useState(0);

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
