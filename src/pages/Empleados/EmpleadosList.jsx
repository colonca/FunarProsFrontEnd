import {
  Alert,
  Pagination,
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
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
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
  const [empleados, setEmpleados] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(null);

  async function fechDataEmpleados(page = 1) {
    try {
      const response = await EmpleadosServices.get(page);

      if (response.status === 200) {
        setEmpleados(response.data);
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
  const handleDeleteEmpleados = useCallback(
    (id) => {
      modalDelete.show().then(async () => {
        try {
          const response = await EmpleadosServices.delete(id);
          if (response.status === 200) {
            setEmpleados((state) => {
              const list = state.filter((item) => item.id !== id);
              if (list === null) {
                return state;
              }
              return list;
            });
            setInfo({
              type: 'success',
              message: 'Institución eliminada correctamente'
            });
          } else {
            setInfo({
              type: 'warning',
              message: response.message
            });
          }
        } catch (error) {
          setInfo({
            type: 'error',
            message: 'se ha producido un error, por favor intentalo más tarde.'
          });
        } finally {
          setLoading(false);
          modalDelete.remove();
        }
      });
    },
    [modalDelete]
  );
  useEffect(() => {
    fechDataEmpleados();
  }, []);
  return (
    <Stack sx={{ margin: '0px 60px' }}>
      <BreadCrumbs items={breadCrumbs} />
      <Filters />
      {info && (
        <Alert
          severity={info.type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setInfo(null);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {info.message}
        </Alert>
      )}
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
            {empleados &&
              empleados.data.map((empleado) => (
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
      <Stack direction="row" marginTop="10px" justifyContent="right">
        {empleados && empleados.total > empleados.per_page && (
          <Pagination
            count={Math.ceil(empleados.total / empleados.per_page)}
            color="primary"
            page={empleados.current_page}
            onChange={(event, page) => {
              fechDataEmpleados(page);
            }}
          />
        )}
      </Stack>
    </Stack>
  );
}

export default EmpleadosList;
