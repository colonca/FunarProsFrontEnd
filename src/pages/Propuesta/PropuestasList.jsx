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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useModal } from '@ebay/nice-modal-react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import BreadCrumbs from '../../components/BreadCrumbs';
import Cell from '../../components/Table/Cell';
import Row from '../../components/Table/Row';
import ButtonDelete from '../../components/ButtonsAction/ActionDelete';
import ButtonEdit from '../../components/ButtonsAction/ActionEdit';
import ButtonView from '../../components/ButtonsAction/ActionView';
import PropuestasModalCreateOrUpdate from './PropuestasModalCreateOrUpdate';
import PropuestasServices from '../../services/PropuestasServices';
import ModalDelete from '../../components/ModalDelete';
import Filters from './components/Filters';

function PropuestaSList() {
  const propuestaModal = useModal(PropuestasModalCreateOrUpdate);
  const modalDelete = useModal(ModalDelete);
  const [propuestas, setPropuestas] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(null);
  const breadCrumbs = useMemo(
    () => [
      { title: 'Gestión', url: '/' },
      { title: 'Propuesta-Contrato', url: '/gestion/propuestas' }
    ],
    []
  );
  const handleEditPropuesta = useCallback(
    (propuesta) => {
      propuestaModal.show({ propuesta });
    },
    [propuestaModal]
  );
  const handleDeletePropuesta = useCallback(
    (id) => {
      modalDelete.show().then(async () => {
        try {
          const response = await PropuestasServices.delete(id);
          if (response.status === 200) {
            setPropuestas((state) => {
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
  async function fetchDataPropuestas(page = 1) {
    try {
      const response = await PropuestasServices.get(page);

      if (response.status === 200) {
        setPropuestas(response.data);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    }
  }
  useEffect(() => {
    fetchDataPropuestas();
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
              <Cell>Numero</Cell>
              <Cell>Nombre</Cell>
              <Cell>Tipo</Cell>
              <Cell>Fecha inicial</Cell>
              <Cell>Empresa Beneficiaria</Cell>
              <Cell>Acciones</Cell>
            </Row>
          </TableHead>
          <TableBody>
            {propuestas &&
              propuestas.data.map((propuesta) => (
                <Row
                  key={propuesta.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <Cell>{propuesta.numero_propuesta}</Cell>
                  <Cell>{propuesta.nombre}</Cell>
                  <Cell>{propuesta.tipo}</Cell>
                  <Cell>{propuesta.fecha_inicial}</Cell>
                  <Cell>{propuesta.empresa_beneficiaria.nombre}</Cell>
                  <Cell>
                    <ButtonView onClick={() => {}} />
                    <ButtonEdit
                      onClick={() => {
                        handleEditPropuesta(propuesta);
                      }}
                    />
                    <ButtonDelete
                      onClick={() => {
                        handleDeletePropuesta(propuesta.id);
                      }}
                    />
                  </Cell>
                </Row>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" marginTop="10px" justifyContent="right">
        {propuestas && propuestas.total > propuestas.per_page && (
          <Pagination
            count={Math.ceil(propuestas.total / propuestas.per_page)}
            color="primary"
            page={propuestas.current_page}
            onChange={(event, page) => {
              fetchDataPropuestas(page);
            }}
          />
        )}
      </Stack>
    </Stack>
  );
}
export default PropuestaSList;
