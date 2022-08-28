import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Stack,
  Alert
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

function InstitucionesList() {
  const institucionModal = useModal(InstitucionesCreateModal);
  const [instituciones, setInstituciones] = useState([]);
  const [info, setInfo] = useState(null);
  const [departamentos, setDepartamentos] = useState([]);

  const breadCrumbs = useMemo(
    () => [
      { title: 'Gestión', url: '/' },
      { title: 'Instituciones', url: '/gestion/institucion' }
    ],
    []
  );
  const handleEditInstitucion = useCallback((institucion) => {
    institucionModal.show({ institucion });
  });
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
  async function fetchData() {
    try {
      const response = await InstitucionesServices.get();

      if (response.status === 200) {
        setInstituciones(response.data.data);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    }
  }
  useEffect(() => {
    fetchData();
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
            {instituciones.map((institucion) => (
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

export default InstitucionesList;
