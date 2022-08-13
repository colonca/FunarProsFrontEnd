import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useRef } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function Dropzone({ onFileUpload, accept, file }) {
  const inputref = useRef(null);

  return (
    <Button
      component="button"
      onClick={() => {
        inputref.current.click();
      }}
      sx={{ width: '100%' }}
    >
      <Box
        border=""
        borderRadius={2}
        width="100%"
        sx={{ padding: '10px', backgroundColor: '#ffff' }}
      >
        <Stack
          border="1px dashed blue"
          borderRadius="10px"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          padding={4}
        >
          <CloudUploadIcon
            sx={{ color: 'blueviolet', width: '90px', height: '90px' }}
          />
          <Typography>Arrasta y suelta el archivo aqui !!!</Typography>
          <input
            ref={inputref}
            type="file"
            accept={accept}
            style={{ display: 'none' }}
            onChange={(event) => {
              const document = event.target.files[0];

              onFileUpload(document);
            }}
          />
        </Stack>
        {file && (
          <Stack direction="row" alignItems="center" width="100%" spacing={2}>
            <CloudUploadIcon />
            <Stack flex="1" alignItems="flex-start">
              <Typography>{file.name}</Typography>
              <Typography>{Math.ceil(file.size / 1024)}kb</Typography>
            </Stack>
          </Stack>
        )}
      </Box>
    </Button>
  );
}

export default Dropzone;
