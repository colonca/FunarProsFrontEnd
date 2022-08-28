import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import 'react-dropzone-uploader/dist/styles.css';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack
} from '@mui/material';
import { Formik } from 'formik';
import ActionCerrar from '../ButtonsAction/ActionCerrar';
import SelectCommon from '../SelectCommon';
import ButtonCommon from '../ButtonCommon';
import Dropzone from '../Dropzone';
import validationDataDocumentsEmpresa from '../../pages/Empresas/ValidationSchemeDataDocuments';

function FileUploadmodal({ documents }) {
  const modal = useModal();

  return (
    <Dialog
      fullScreen={false}
      maxWidth="md"
      fullWidth
      open={modal.visible}
      onClose={() => modal.hide()}
    >
      <Stack
        sx={{
          position: 'absolute',
          cursor: 'pointer',
          marginTop: '15px',
          marginLeft: '96%'
        }}
        direction="row"
        justifyContent="flex-end"
      >
        <ActionCerrar
          onClick={() => {
            modal.remove();
          }}
        />
      </Stack>
      <DialogTitle sx={{ padding: '10px', margin: '0px 10px' }}>
        Agregar Documentos
      </DialogTitle>
      <DialogContent>
        <Formik
          validationSchema={validationDataDocumentsEmpresa}
          initialValues={{ document: '', file: '' }}
          onSubmit={(values) => {
            modal.resolve(values);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ padding: '10px 40px 0px 40px ' }}>
                <Grid container direction="row" spacing={2} marginBottom={2}>
                  <Grid item lg={12}>
                    <SelectCommon
                      options={documents}
                      value={formik.values.document}
                      error={formik.touched.document && formik.errors.document}
                      onChange={(value) => {
                        formik.setFieldValue('document', value);
                      }}
                      required
                      label="Listado de documentos"
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Box sx={{ padding: '30px' }}>
                  <Dropzone
                    file={formik.values.file}
                    accept=".pdf"
                    error={formik.touched.file && formik.errors.file}
                    onFileUpload={(file) => {
                      formik.setFieldValue('file', file);
                    }}
                  />
                </Box>
              </Box>
              <Stack
                spacing={2}
                direction="row"
                sx={{ padding: '10px', justifyContent: 'center' }}
              >
                <ButtonCommon
                  type="button"
                  variant="outlined"
                  onClick={() => {
                    modal.remove();
                  }}
                >
                  CANCELAR
                </ButtonCommon>
                <ButtonCommon type="submit">CONTINUAR</ButtonCommon>
              </Stack>
            </form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default NiceModal.create(FileUploadmodal);
