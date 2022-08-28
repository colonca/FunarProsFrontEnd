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

function PropuestaSList() {
  const breadCrumbs = useMemo(
    () => [
      { title: 'Gestión', url: '/' },
      { title: 'Propuesta-Contrato', url: '/gestion/propuestas' }
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
              <Cell>Nit</Cell>
              <Cell>Nombre</Cell>
              <Cell>Tipo</Cell>
              <Cell>Correo</Cell>
              <Cell>Fecha convenio</Cell>
              <Cell>Municipio</Cell>
              <Cell>Acciones</Cell>
            </Row>
          </TableHead>
          <TableBody>
            {() => (
              <Row sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <Cell>{}</Cell>
                <Cell>{}</Cell>
                <Cell>{}</Cell>
                <Cell>{}</Cell>
                <Cell>{}</Cell>
                <Cell>{}</Cell>
                <Cell>
                  <ButtonView onClick={() => {}} />
                  <ButtonEdit onClick={() => {}} />
                  <ButtonDelete onClick={() => {}} />
                </Cell>
              </Row>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default PropuestaSList;
