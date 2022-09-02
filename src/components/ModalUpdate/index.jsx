import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Alert, Dialog, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ButtonCommon from '../ButtonCommon';

function ModalUpdate({ type, message }) {
  const modal = useModal();
  return (
    <Dialog
      fullScreen={false}
      maxWidth="lg"
      fullWidth={false}
      open={modal.visible}
      onClose={() => modal.hide()}
    >
      <Alert
        severity={type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              modal.remove();
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {message}
      </Alert>
      <Stack sx={{ padding: '40px' }}>
        <ButtonCommon
          onClick={() => {
            modal.resolve();
          }}
        >
          ACEPTAR
        </ButtonCommon>
      </Stack>
    </Dialog>
  );
}

export default NiceModal.create(ModalUpdate);
