import { Box, styled } from '@mui/material';
import React from 'react';
import { HashLoader } from 'react-spinners';

const Container = styled(Box)(() => ({}));

function Loading() {
  return (
    <Container
      sx={{
        zIndex: 'tooltip',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        height: '84%',
        width: '98%',
        position: 'absolute'
      }}
    >
      <HashLoader color="#156c24" height={100} width={100} />
    </Container>
  );
}

export default Loading;
