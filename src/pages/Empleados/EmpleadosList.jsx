import { Stack } from '@mui/material';
import React, { useMemo } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs';
import Filters from './components/Filters';

function EmpleadosList() {
  const breadCrumbs = useMemo(
    () => [
      { title: 'Gestión', url: '/' },
      { title: 'Empleados', url: '/gestion/empleados' }
    ],
    []
  );
  return (
    <Stack sx={{ margin: '0px 60px' }}>
      <BreadCrumbs items={breadCrumbs} />
      <Filters />
      <div>Empleados list</div>
    </Stack>
  );
}

export default EmpleadosList;
