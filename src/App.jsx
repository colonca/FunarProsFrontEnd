import React from 'react';
import './index.css';
import { Stack } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

// components
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Sidebar from './parts/SideBar';
import Navbar from './parts/NavBar';
import InstitucionesList from './pages/Instituciones/InstitucionesList';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Poppins',
      textTransform: 'none',
      fontSize: 16
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" sx={{ width: '100%', height: '100vh' }}>
        <Stack sx={{ background: '#6D66C', width: '260px', overflowY: 'auto' }}>
          <Sidebar />
        </Stack>
        <Stack flexGrow="1" sx={{ height: '100vh' }}>
          <Stack sx={{ height: '70px', background: '#FAFAFA' }}>
            <Navbar />
          </Stack>
          <Stack
            flexGrow="1"
            sx={{
              background: '#FAFAFA',
              width: '100%',
              height: '100%',
              overflowY: 'auto'
            }}
          >
            <Routes>
              <Route
                exact
                path="gestion/institucion"
                element={<InstitucionesList />}
              />
              <Route path="gestion/empleado" />
              <Route path="gestion/empresa" />
              <Route path="gestion/contrato" />
              <Route path="servicio/contrato-obras-civiles" />
              <Route path="servicio/contrato-pae" />
              <Route path="reporte/pae" />
            </Routes>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}
export default App;
