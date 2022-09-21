import { Grid, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useModal } from '@ebay/nice-modal-react';
import { Formik } from 'formik';
import ButtonCommon from '../../../components/ButtonCommon';
import SelectCommon from '../../../components/SelectCommon';
import InstitucionesCreateModal from '../InstitucionesCreateModal';
import MunicipiosServices from '../../../services/MunicipiosServices';
import DepartamentosServices from '../../../services/DepartamentosServices';

function Filters() {
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  async function fechDataDepartamentos() {
    try {
      setLoading(true);
      const response = await DepartamentosServices.get();
      if (response.status === 200) {
        setDepartamentos(
          response.data.map((item) => ({ value: item.id, label: item.name }))
        );
        setLoading(false);
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    } finally {
      setLoading(null);
    }
  }
  async function fechDataMunicipios(id) {
    try {
      const response = await MunicipiosServices.get(id);
      if (response.status === 200) {
        setMunicipios(
          response.data.map((item) => ({ label: item.name, value: item.id }))
        );
      }
    } catch (error) {
      setInfo({
        type: 'error',
        message: 'se ha producido un error, por favor intentelo más tarde.'
      });
    } finally {
      setLoading(null);
    }
  }

  const modal = useModal(InstitucionesCreateModal);
  useEffect(() => {
    fechDataDepartamentos();
  }, []);
  return (
    <Formik
      enableReinitialize
      initialValues={{
        departamento: '',
        municipio: ''
      }}
      onSubmit={(values, { resetForm }) => {
        // handleSubmit(values);
        resetForm();
      }}
    >
      <Grid
        container
        direction="row"
        spacing={2}
        marginTop={1}
        marginBottom={2}
      >
        <Grid item lg={5}>
          <SelectCommon
            options={departamentos}
            label="Departamento"
            onChange={(departamento) => {
              fechDataMunicipios(departamento.value);
            }}
          />
        </Grid>

        <Grid item lg={4}>
          <SelectCommon
            label="Municipio"
            options={municipios}
            onChange={(municipio) => {
              setFilter(municipio.value);
              console.log(municipio.value);
            }}
          />
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
                modal.show();
              }}
            >
              AGREGAR
            </ButtonCommon>
          </Stack>
        </Grid>
      </Grid>
    </Formik>
  );
}

export default Filters;
