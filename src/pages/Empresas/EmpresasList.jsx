import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead
} from '@mui/material';
import React, { useMemo, useState, useEffect } from 'react';
import BreadCrumbs from '../../components/BreadCrumbs';
import Cell from '../../components/Table/Cell';
import Row from '../../components/Table/Row';
import Filters from './components/Filters';
import ButtonDelete from '../../components/ButtonsAction/ActionDelete';
import ButtonEdit from '../../components/ButtonsAction/ActionEdit';
import ButtonView from '../../components/ButtonsAction/ActionView';
import EmpresasServices from '../../services/EmpresasServices';

function EmpresasList() {
  const [empresas, setEmpresas] = useState([]);
  const [info, setInfo] = useState(null);
  async function fechDataEmpresas() {
    try {
      const response = await EmpresasServices.get();
      if (response.status === 200) {
        setEmpresas(response.data.data);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    }
  }
  const breadCrumbs = useMemo(
    () => [
      { title: 'Gestión', url: '/' },
      { title: 'Empresas', url: '/gestion/empresas' }
    ],
    []
  );
  useEffect(() => {
    fechDataEmpresas();
  }, []);
  return (
    <Stack sx={{ margin: '0px 60px' }}>
      <BreadCrumbs items={breadCrumbs} />
      <Filters />
      {console.log(empresas)}
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
            {empresas.map((empresa) => (
              <Row
                key={empresa.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <Cell>{empresa.nit}</Cell>
                <Cell>{empresa.nombre}</Cell>
                <Cell>{empresa.tipos.name}</Cell>
                <Cell>{empresa.email}</Cell>
                <Cell>{empresa.fecha_convenio}</Cell>
                <Cell>{empresa.municipio_id}</Cell>
                <Cell>
                  <ButtonView onClick={() => {}} />
                  <ButtonEdit onClick={() => {}} />
                  <ButtonDelete onClick={() => {}} />
                </Cell>
              </Row>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default EmpresasList;
