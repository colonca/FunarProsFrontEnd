import { Grid, Stack } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonCommon from '../../../components/ButtonCommon';
import TextFieldCommon from '../../../components/TextFieldCommon';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];
function Filters() {
  const navigate = useNavigate();

  // const [departamento, setDepartamento] = React.useState('');
  // const handleChange = (event) => {
  // setDepartamento(event.target.value);
  // };
  return (
    <Grid container direction="row" spacing={2} marginTop={1} marginBottom={2}>
      <Grid item lg={4}>
        <TextFieldCommon label="Numero de identificación" />
      </Grid>
      <Grid item lg={4}>
        <TextFieldCommon label="Nombre" />
      </Grid>
      <Grid item lg={4}>
        <Stack direction="row">
          <ButtonCommon sx={{ marginTop: '20px', marginRight: '5px' }}>
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
