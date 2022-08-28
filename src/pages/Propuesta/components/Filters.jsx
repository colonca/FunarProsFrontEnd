import { Grid, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonCommon from '../../../components/ButtonCommon';
import SelectCommon from '../../../components/SelectCommon';
import TextFieldCommon from '../../../components/TextFieldCommon';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];
function Filters() {
  const validate = useNavigate();
  return (
    <Grid container direction="row" spacing={2} marginTop={1} marginBottom={2}>
      <Grid item lg={3}>
        <SelectCommon label="Departamento" options={options} />
      </Grid>
      <Grid item lg={3}>
        <SelectCommon label="Municipio" options={options} />
      </Grid>
      <Grid item lg={3}>
        <TextFieldCommon label="Nombre" />
      </Grid>
      <Grid item lg={3}>
        <Stack direction="row">
          <ButtonCommon sx={{ marginTop: '20px', marginRight: '5px' }}>
            BUSCAR
          </ButtonCommon>
          <ButtonCommon
            sx={{ marginTop: '20px' }}
            onClick={() => {
              validate('/gestion/propuestas/crear');
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
