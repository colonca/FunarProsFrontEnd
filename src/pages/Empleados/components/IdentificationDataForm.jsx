import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import ButtonCommon from '../../../components/ButtonCommon';
import DatePickerCommon from '../../../components/Datepicker';
import SelectCommon from '../../../components/SelectCommon';
import TextFieldCommon from '../../../components/TextFieldCommon';

function IdentificationDataForm() {
  return (
    <Box>
      <Typography
        sx={{
          fontSize: '16px',
          padding: '0px 30px',
          margin: '0px 10px',
          color: '#6D66CC'
        }}
      >
        Datos de identificación
      </Typography>
      <Box sx={{ padding: '10px 40px 0px 40px ' }}>
        <Grid container direction="row" spacing={2} marginBottom={2}>
          <Grid item lg={4}>
            <SelectCommon required label="Tipo de documentación" />
          </Grid>
          <Grid item lg={4}>
            <TextFieldCommon required label="Número de identificación" />
          </Grid>
          <Grid item lg={4}>
            <DatePickerCommon required label="Fecha de Expedición" />
          </Grid>
          <Grid item lg={4}>
            <TextFieldCommon required label="Nombres" />
          </Grid>
          <Grid item lg={4}>
            <TextFieldCommon required label="Apellidos" />
          </Grid>
          <Grid item lg={4}>
            <TextFieldCommon required label="Número de telefono" />
          </Grid>
          <Grid item lg={4}>
            <SelectCommon required label="Genero" />
          </Grid>
          <Grid item lg={4}>
            <TextFieldCommon required label="Correo electronico" />
          </Grid>
          <Grid item lg={4}>
            <DatePickerCommon required label="Fecha de Nacimiento" />
          </Grid>
        </Grid>
      </Box>
      <Typography
        sx={{
          fontSize: '16px',
          padding: '0px 30px',
          margin: '0px 10px',
          color: '#6D66CC'
        }}
      >
        Datos de ubicación
      </Typography>

      <Box sx={{ padding: '10px 40px 0px 40px ' }}>
        <Grid container direction="row" spacing={2} marginBottom={2}>
          <Grid item lg={4}>
            <TextFieldCommon required label="Ocupación" />
          </Grid>
          <Grid item lg={4}>
            <SelectCommon required label="Nivel de escolaridad" />
          </Grid>
          <Grid item lg={4}>
            <TextFieldCommon required label="Dirección de residencia" />
          </Grid>
        </Grid>
      </Box>
      <Stack
        spacing={2}
        direction="row"
        sx={{ margin: '20px', justifyContent: 'center' }}
      >
        <ButtonCommon
          type="button"
          variant="outlined"
          onClick={() => {
            modal.hide();
          }}
        >
          CANCELAR
        </ButtonCommon>
        <ButtonCommon type="submit">CONTINUAR</ButtonCommon>
      </Stack>
    </Box>
  );
}

export default IdentificationDataForm;
