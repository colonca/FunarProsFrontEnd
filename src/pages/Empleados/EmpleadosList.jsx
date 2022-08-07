import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead
} from '@mui/material';
import React, { useMemo } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs';
import Cell from '../../components/Table/Cell';
import Row from '../../components/Table/Row';
import ButtonDelete from '../../components/ButtonsAction/ActionDelete';
import ButtonEdit from '../../components/ButtonsAction/ActionEdit';
import ButtonView from '../../components/ButtonsAction/ActionView';
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <Row>
              <Cell>Tipo</Cell>
              <Cell>Nombres</Cell>
              <Cell>Apellidos</Cell>
              <Cell>Telefono</Cell>
              <Cell>Genero</Cell>
              <Cell>Ocupación</Cell>
              <Cell>Correo</Cell>
              <Cell>Acciones</Cell>
            </Row>
          </TableHead>
          <TableBody>
            <Row>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell>
                <ButtonView onClick={() => {}} />
                <ButtonEdit onClick={() => {}} />
                <ButtonDelete onClick={() => {}} />
              </Cell>
            </Row>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default EmpleadosList;
