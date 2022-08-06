import { Stack } from '@mui/material';
import React, { useMemo } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs';
import Filters from './components/Filters';

function EmpresasList() {
  const breadCrumbs = useMemo(
    () => [
      { title: 'Gestión', url: '/' },
      { title: 'Empresas', url: '/gestion/empresas' }
    ],
    []
  );
  return (
    <Stack sx={{ margin: '0px 60px' }}>
      <BreadCrumbs items={breadCrumbs} />
      <Filters />
      <div>EmpresasList</div>
    </Stack>
  );
}

export default EmpresasList;
