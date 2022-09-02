import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead
} from '@mui/material';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '@ebay/nice-modal-react';
import BreadCrumbs from '../../components/BreadCrumbs';
import Cell from '../../components/Table/Cell';
import Row from '../../components/Table/Row';
import ButtonDelete from '../../components/ButtonsAction/ActionDelete';
import ButtonEdit from '../../components/ButtonsAction/ActionEdit';
import ButtonView from '../../components/ButtonsAction/ActionView';
import Filters from './components/Filters';
import EmpleadosServices from '../../services/EmpleadosServices';
import ModalDelete from '../../components/ModalDelete';

function EmpleadosList() {
  const navigate = useNavigate();
  const modalDelete = useModal(ModalDelete);
  const [empleados, setEmpleados] = useState([]);
  const [info, setInfo] = useState(null);

  async function fechDataEmpleados() {
    try {
      const response = await EmpleadosServices.get();

      if (response.status === 200) {
        setEmpleados(response.data.data);
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
      { title: 'Empleados', url: '/gestion/empleados' }
    ],
    []
  );
  const handleDeleteEmpleados = useCallback((id) => {
    modalDelete.show();
  });
  useEffect(() => {
    fechDataEmpleados();
  }, []);
  return (
    <Stack sx={{ margin: '0px 60px' }}>
      <BreadCrumbs items={breadCrumbs} />
      <Filters />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <Row>
              <Cell>Documento</Cell>
              <Cell>Nombres</Cell>
              <Cell>Telefono</Cell>
              <Cell>Genero</Cell>
              <Cell>Ocupación</Cell>
              <Cell>Acciones</Cell>
            </Row>
          </TableHead>
          <TableBody>
            {empleados.map((empleado) => (
              <Row
                key={empleado.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <Cell>{empleado.documento.initials}</Cell>
                <Cell>{`${empleado.nombres} ${empleado.apellidos}`}</Cell>

                <Cell>{empleado.numero_telefono}</Cell>
                <Cell>{empleado.genero.name}</Cell>
                <Cell>{empleado.ocupacion}</Cell>
                <Cell>
                  <ButtonView onClick={() => {}} />
                  <ButtonEdit
                    onClick={() => {
                      navigate(`/gestion/empleados/editar/${empleado.id}`);
                    }}
                  />
                  <ButtonDelete
                    onClick={() => {
                      handleDeleteEmpleados(empleado.id);
                    }}
                  />
                </Cell>
              </Row>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default EmpleadosList;
