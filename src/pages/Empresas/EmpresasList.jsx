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
import Filters from './components/Filters';
import ButtonDelete from '../../components/ButtonsAction/ActionDelete';
import ButtonEdit from '../../components/ButtonsAction/ActionEdit';
import ButtonView from '../../components/ButtonsAction/ActionView';
import EmpresasServices from '../../services/EmpresasServices';
import ModalDelete from '../../components/ModalDelete';

function EmpresasList() {
  const [empresas, setEmpresas] = useState(null);
  const modalDelete = useModal(ModalDelete);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const [info, setInfo] = useState(null);
  async function fechDataEmpresas(page = 1) {
    try {
      const response = await EmpresasServices.get(page);
      if (response.status === 200) {
        setEmpresas(response.data);
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

  const handleDeleteEmpresas = useCallback(
    (id) => {
      modalDelete.show().then(async () => {
        try {
          const response = await EmpresasServices.delete(id);
          if (response.status === 200) {
            setEmpresas((state) => {
              const list = state.data.filter((item) => item.id !== id);
              return { ...state, data: list };
            });
            setInfo({
              type: 'success',
              message: 'Empresa eliminada correctamente'
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
    fechDataEmpresas();
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
              <Cell>Nit</Cell>
              <Cell>Nombre</Cell>
              <Cell>Correo</Cell>
              <Cell>Fecha convenio</Cell>
              <Cell>Municipio</Cell>
              <Cell>Acciones</Cell>
            </Row>
          </TableHead>
          <TableBody>
            {empresas &&
              empresas.data.map((empresa) => (
                <Row
                  key={empresa.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <Cell>{empresa.nit}</Cell>
                  <Cell>{empresa.nombre}</Cell>
                  <Cell>{empresa.email}</Cell>
                  <Cell>{empresa.fecha_convenio}</Cell>
                  <Cell>{empresa.term.name}</Cell>
                  <Cell>
                    <ButtonView onClick={() => {}} />
                    <ButtonEdit
                      onClick={() => {
                        navigate(`/gestion/empresas/editar/${empresa.id}`);
                      }}
                    />
                    <ButtonDelete
                      onClick={() => {
                        handleDeleteEmpresas(empresa.id);
                      }}
                    />
                  </Cell>
                </Row>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="right">
        {empresas && empresas.total > empresas.per_page && (
          <Pagination
            count={empresas.total / empresas.per_page}
            color="primary"
            page={empresas.current_page}
            onChange={(event, page) => {
              fechDataEmpresas(page);
            }}
          />
        )}
      </Stack>
    </Stack>
  );
}

export default EmpresasList;
