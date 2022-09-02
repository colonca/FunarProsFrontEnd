import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Box, Dialog, Stack, Typography } from '@mui/material';
import ButtonCommon from '../ButtonCommon';
import ActionCerrar from '../ButtonsAction/ActionCerrar';

function ModalDelete() {
  const modal = useModal();

  const handleDelete = async () => {
    modal.resolve();
    await modal.hide();
  };
  return (
    <Dialog
      fullScreen={false}
      maxWidth="lg"
      fullWidth={false}
      open={modal.visible}
      onClose={() => modal.hide()}
    >
      <Stack
        sx={{
          position: 'absolute',
          cursor: 'pointer',
          marginTop: '15px',
          marginLeft: '93%'
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
      <Stack sx={{ padding: '20px' }}>
        <Box padding="50px">
          <Typography>
            ¿Está segur@ que desea eliminar estos registros ? Este proceso será
            permanente
          </Typography>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={{ textAlign: 'center', justifyContent: 'center' }}
        >
          <ButtonCommon
            variant="outlined"
            onClick={() => {
              modal.remove();
            }}
          >
            Cancelar
          </ButtonCommon>
          <ButtonCommon
            onClick={() => {
              handleDelete();
            }}
          >
            Si, estoy segur@
          </ButtonCommon>
        </Stack>
      </Stack>
    </Dialog>
  );
}

export default NiceModal.create(ModalDelete);
