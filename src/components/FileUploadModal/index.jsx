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
import ActionCerrar from '../ButtonsAction/ActionCerrar';
import SelectCommon from '../SelectCommon';
import ButtonCommon from '../ButtonCommon';
import Dropzone from '../Dropzone';

function FileUploadmodal() {
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
        <Box sx={{ padding: '10px 40px 0px 40px ' }}>
          <Grid container direction="row" spacing={2} marginBottom={2}>
            <Grid item lg={12}>
              <SelectCommon required label="Listado de documentos" />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box sx={{ padding: '30px' }}>
            <Dropzone />
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
          <ButtonCommon onClick={{}} type="submit">
            CONTINUAR
          </ButtonCommon>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default NiceModal.create(FileUploadmodal);
