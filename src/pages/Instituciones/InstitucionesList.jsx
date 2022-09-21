import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Stack,
  Alert,
  List,
  Pagination
} from '@mui/material';
import { React, useEffect, useMemo, useState, useCallback } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useModal } from '@ebay/nice-modal-react';
import BreadCrumbs from '../../components/BreadCrumbs/index';
import ButtonDelete from '../../components/ButtonsAction/ActionDelete';
import ButtonEdit from '../../components/ButtonsAction/ActionEdit';
import ButtonView from '../../components/ButtonsAction/ActionView';
import Cell from '../../components/Table/Cell';
import Row from '../../components/Table/Row';
import DepartamentosServices from '../../services/DepartamentosServices';
import InstitucionesServices from '../../services/InstitucionesServices';
import Filters from './components/Filters';
import InstitucionesCreateModal from './InstitucionesCreateModal';
import ModalDelete from '../../components/ModalDelete';

function InstitucionesList() {
  const institucionModal = useModal(InstitucionesCreateModal);
  const modalDelete = useModal(ModalDelete);
  const [instituciones, setInstituciones] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(null);
  const [departamentos, setDepartamentos] = useState([]);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Gestión', url: '/' },
      { title: 'Instituciones', url: '/gestion/institucion' }
    ],
    []
  );
  const handleEditInstitucion = useCallback(
    (institucion) => {
      institucionModal.show({ institucion });
    },
    [institucionModal]
  );

  const handleDeleteInstitucion = useCallback(
    (id) => {
      modalDelete.show().then(async () => {
        try {
          const response = await InstitucionesServices.delete(id);
          if (response.status === 200) {
            setInstituciones((state) => {
              const list = state.data.filter((item) => item.id !== id);
              return { ...state, data: list };
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
  async function fechDataDepartamentos() {
    try {
      const response = await DepartamentosServices.get();
      if (response.status === 200) {
        setDepartamentos(response.data.data);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    }
  }
  async function fetchDataInstituciones(page = 1) {
    try {
      const response = await InstitucionesServices.get(page);

      if (response.status === 200) {
        setInstituciones(response.data);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    }
  }
  useEffect(() => {
    fetchDataInstituciones();
    fechDataDepartamentos();
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
              <Cell>Tipo</Cell>
              <Cell>Inicio de Convenio</Cell>
              <Cell>Telefono</Cell>
              <Cell>Municipio</Cell>
              <Cell>Correo</Cell>
              <Cell>Acciones</Cell>
            </Row>
          </TableHead>
          <TableBody>
            {instituciones &&
              instituciones.data.map((institucion) => (
                <Row
                  key={institucion.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <Cell>{institucion.identificacion}</Cell>
                  <Cell>{institucion.nombre}</Cell>
                  <Cell>{institucion.tipo}</Cell>
                  <Cell>{institucion.inicio_convenio}</Cell>
                  <Cell>{institucion.telefono}</Cell>
                  <Cell>{institucion.term.name}</Cell>
                  <Cell>{institucion.email}</Cell>
                  <Cell>
                    <ButtonView onClick={() => {}} />
                    <ButtonEdit
                      onClick={() => {
                        handleEditInstitucion(institucion);
                      }}
                    />
                    <ButtonDelete
                      onClick={() => {
                        handleDeleteInstitucion(institucion.id);
                      }}
                    />
                  </Cell>
                </Row>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" marginTop="10px" justifyContent="right">
        {instituciones && instituciones.total > instituciones.per_page && (
          <Pagination
            count={Math.ceil(instituciones.total / instituciones.per_page)}
            color="primary"
            page={instituciones.current_page}
            onChange={(event, page) => {
              fetchDataInstituciones(page);
            }}
          />
        )}
      </Stack>
    </Stack>
  );
}

export default InstitucionesList;
