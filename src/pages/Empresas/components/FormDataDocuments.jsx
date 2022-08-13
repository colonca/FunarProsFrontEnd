import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead
} from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { useModal } from '@ebay/nice-modal-react';
import ButtonDelete from '../../../components/ButtonsAction/ActionDelete';
import ButtonEdit from '../../../components/ButtonsAction/ActionEdit';
import ButtonView from '../../../components/ButtonsAction/ActionView';
import ButtonCommon from '../../../components/ButtonCommon';
import Cell from '../../../components/Table/Cell';
import Row from '../../../components/Table/Row';
import FileUploadModal from '../../../components/FileUploadModal';

function FormDataDocuments({ data, back, setData }) {
  const modal = useModal(FileUploadModal);
  return (
    <Formik
      validationSchema
      enableReinitialize
      initialValues={
        data || {
          soporte_documento: ''
        }
      }
      onSubmit={(values) => {
        const request = { ...data, ...values };
        console.log(request);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          {JSON.stringify(formik.errors)}
          <Stack
            direction="row"
            sx={{ justifyContent: 'flex-end', marginBottom: '10px' }}
          >
            <ButtonCommon
              onClick={() => {
                modal.show();
              }}
            >
              AGREGAR
            </ButtonCommon>
          </Stack>
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
                  <Row>
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
            <ButtonCommon type="submit">GUARDAR</ButtonCommon>
          </Stack>
        </form>
      )}
    </Formik>
  );
}

export default FormDataDocuments;
