import React from 'react';
import './index.css';
import { Stack } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

// components
import Sidebar from './parts/SideBar';
import Navbar from './parts/NavBar';

function App() {
  return (
    <Stack direction="row" sx={{ width: '100%', height: '100vh' }}>
      <Stack sx={{ background: '#6D66C', width: '260px', overflowY: 'auto' }}>
        <Sidebar />
      </Stack>
      <Stack flexGrow="1" sx={{ height: '100vh' }}>
        <Stack sx={{ height: '70px', background: '#FAFAFA' }}>
          <Navbar />
        </Stack>
        <Stack flexGrow="1" sx={{ background: '#FAFAFA' }}>
          <p>content</p>
          <Routes>
            <Route path="gestion/estudiante" />
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
  );
}

export default App;
