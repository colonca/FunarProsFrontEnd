import {
  Alert,
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead
} from '@mui/material';
import { Formik } from 'formik';
import React, { useState, useEffect, useCallback } from 'react';
import { useModal } from '@ebay/nice-modal-react';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ButtonDelete from '../../../components/ButtonsAction/ActionDelete';
import ButtonEdit from '../../../components/ButtonsAction/ActionEdit';
import ButtonView from '../../../components/ButtonsAction/ActionView';
import ButtonCommon from '../../../components/ButtonCommon';
import Cell from '../../../components/Table/Cell';
import Row from '../../../components/Table/Row';
import FileUploadModal from '../../../components/FileUploadModal';
import DocumentosEmpresasServices from '../../../services/DocumentosEmpresasServices';
import ValidationSchemeArray from '../ValidationSchemeArray';
import EmpresasServices from '../../../services/EmpresasServices';

function FormDataDocuments({ data, back, setData }) {
  const [documentos, setDocumentos] = useState([]);
  const [info, setInfo] = useState(null);

  async function fechDataDocumentosEmpresas() {
    try {
      const response = await DocumentosEmpresasServices.get();
      if (response.status === 200) {
        setDocumentos(
          response.data.map((item) => ({ label: item.name, value: item.id }))
        );
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    }
  }

  const handleSubmit = useCallback(async (values) => {
    const NewEmpresa = { ...values };

    const Empresa = {
      nit: NewEmpresa.nit,
      nombre: NewEmpresa.nombre,
      tipo_id: NewEmpresa.tipo_id.value,
      email: NewEmpresa.email,
      telefono: NewEmpresa.telefono,
      fecha_convenio: NewEmpresa.fecha_convenio,
      municipio_id: NewEmpresa.municipio_id.value,
      soportes: NewEmpresa.files
    };
    try {
      let response = null;
      response = await EmpresasServices.post(Empresa);
      if (response.status === 200) {
        setInfo({
          type: 'success',
          message: response.message
        });
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    }
  }, []);
  useEffect(() => {
    fechDataDocumentosEmpresas();
  }, []);

  const modal = useModal(FileUploadModal);
  return (
    <Formik
      validationSchema={ValidationSchemeArray}
      enableReinitialize
      initialValues={data}
      validateOnMount
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Stack
            direction="row"
            sx={{ justifyContent: 'flex-end', marginBottom: '10px' }}
          >
            <ButtonCommon
              onClick={() => {
                modal.show({ documents: documentos }).then((file) => {
                  modal.hide();
                  setData((state) => {
                    const index = state.files.findIndex(
                      (item) => item.document.value === file.document.value
                    );
                    if (index !== -1) return state;

                    return { ...state, files: [...state.files, file] };
                  });
                });
              }}
            >
              AGREGAR
            </ButtonCommon>
          </Stack>

          <Box>
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
          </Box>
          <Stack>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <Row>
                    <Cell>Id</Cell>
                    <Cell>Nombre</Cell>
                    <Cell>Acciones</Cell>
                  </Row>
                </TableHead>
                <TableBody>
                  {formik.values.files.map((item) => (
                    <Row
                      value={formik.values.files}
                      key={item.document.value}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}
                    >
                      <Cell>{item.document.value}</Cell>
                      <Cell>{item.document.label}</Cell>
                      <Cell>
                        <ButtonView onClick={() => {}} />
                        <ButtonEdit onClick={() => {}} />
                        <ButtonDelete
                          onClick={() => {
                            setData((state) => {
                              const array = state.files.filter(
                                (file) =>
                                  file.document.value !== item.document.value
                              );
                              return { ...state, files: array };
                            });
                          }}
                        />
                      </Cell>
                    </Row>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ marginTop: '20px' }}> paginate</Box>
          </Stack>
          <Stack
            spacing={2}
            direction="row"
            sx={{ padding: '10px', justifyContent: 'center' }}
          >
            <ButtonCommon
              type="button"
              variant="outlined"
              onClick={() => {
                setData((state) => ({ ...state, ...formik.values }));
                back();
              }}
            >
              ATRAS
            </ButtonCommon>
            <ButtonCommon
              onClick={() => {
                if (formik.values.files.length === 0) {
                  setInfo({ type: 'error', message: formik.errors.files });
                }
              }}
              type="submit"
            >
              GUARDAR
            </ButtonCommon>
          </Stack>
        </form>
      )}
    </Formik>
  );
}

export default FormDataDocuments;
