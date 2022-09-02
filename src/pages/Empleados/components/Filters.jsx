import { Grid, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonCommon from '../../../components/ButtonCommon';
import TextFieldCommon from '../../../components/TextFieldCommon';

function Filters() {
  const navigate = useNavigate();
  return (
    <Grid container direction="row" spacing={2} marginTop={1} marginBottom={2}>
      <Grid item lg={4}>
        <TextFieldCommon label="Numero de identificación" />
      </Grid>
      <Grid item lg={5}>
        <TextFieldCommon label="Nombre" />
      </Grid>
      <Grid item lg={3}>
        <Stack direction="row">
          <ButtonCommon
            variant="outlined"
            sx={{ marginTop: '20px', marginRight: '5px' }}
          >
            BUSCAR
          </ButtonCommon>
          <ButtonCommon
            sx={{ marginTop: '20px' }}
            onClick={() => {
              navigate('/gestion/empleados/crear');
            }}
          >
            AGREGAR
          </ButtonCommon>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Filters;
