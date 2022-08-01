import React from 'react';
import { Stack, Box } from '@mui/material';

// icons

import SchemaOutlinedIcon from '@mui/icons-material/SchemaOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import MiscellaneousServicesOutlinedIcon from '@mui/icons-material/MiscellaneousServicesOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import Logo from '../assets/images/logo-blanco.png';

// componentss
import SidebarDropdown from '../components/SidebarDropdown/index';
import SidebarLink from '../components/SidebarLink/index';

// import '../assets/sidebar.css';

function Sidebar() {
  return (
    <Stack direction="column" sx={{ width: '100%', height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10px',
          paddingTop: '40px',
          background: '#6D66CC'
        }}
      >
        <img src={Logo} alt="/" />
      </Box>
      <Stack
        flex={1}
        sx={{ background: '#6D66CC', width: '260px', overflowY: 'auto' }}
      >
        <SidebarDropdown icon={<BusinessOutlinedIcon />} title="Gestión">
          <SidebarLink
            link="gestion/institucion"
            icon={<HistoryEduOutlinedIcon />}
            title="Instituciones"
          />
          <SidebarLink
            link="gestion/empleado"
            icon={<GroupsOutlinedIcon />}
            title="Empleados"
          />
          <SidebarLink
            link="gestion/empresa"
            icon={<AddBusinessOutlinedIcon />}
            title="Empresas"
          />
          <SidebarLink
            link="gestion/contrato"
            icon={<CollectionsBookmarkOutlinedIcon />}
            title="Contratos"
          />
        </SidebarDropdown>
        <SidebarDropdown
          icon={<MiscellaneousServicesOutlinedIcon />}
          title="Servicios"
        >
          <SidebarLink
            link="servicio/contrato-obras-civiles"
            icon={<MapsHomeWorkOutlinedIcon />}
            title="Contratos Obras"
          />
          <SidebarLink
            icon={<SchemaOutlinedIcon />}
            link="servicio/contrato-pae"
            title="Contratos PAE"
          />
        </SidebarDropdown>
        <SidebarDropdown icon={<AssessmentOutlinedIcon />} title="Reportes">
          <SidebarLink
            icon={<SchemaOutlinedIcon />}
            link="reporte/pae"
            title="PAE"
          />
        </SidebarDropdown>
      </Stack>
    </Stack>
  );
}

export default Sidebar;
