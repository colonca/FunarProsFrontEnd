import React from 'react';
import { Stack, Box } from '@mui/material';

// icons

import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import HistoryEduOutlinedIcon from '@mui/icons-material/HistoryEduOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CurtainsClosedIcon from '@mui/icons-material/CurtainsClosed';
import { useKeycloak } from '@react-keycloak/web';
import Logo from '../assets/images/logo-blanco.png';

// componentss
import SidebarDropdown from '../components/SidebarDropdown/index';
import SidebarLink from '../components/SidebarLink/index';

// import '../assets/sidebar.css';

function Sidebar() {
  const { keycloak } = useKeycloak();

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
            link="gestion/instituciones"
            icon={<HistoryEduOutlinedIcon />}
            title="Instituciones"
          />
          <SidebarLink
            link="gestion/empleados"
            icon={<GroupsOutlinedIcon />}
            title="Empleados"
          />
          <SidebarLink
            link="gestion/empresas"
            icon={<AddBusinessOutlinedIcon />}
            title="Empresas"
          />
          <SidebarLink
            link="gestion/propuestas"
            icon={<CollectionsBookmarkOutlinedIcon />}
            title="Contrato"
          />
        </SidebarDropdown>
        {/* <SidebarDropdown
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
            link="reporte/contratos"
            title="Contratos"
          />
        </SidebarDropdown>
*/}

        <SidebarLink
          icon={<CurtainsClosedIcon sx={{ color: 'white' }} />}
          link="reporte/contratos"
          title="Cerrar Sesion"
        />
        <button
          type="button"
          onClick={() => {
            keycloak.logout();
          }}
        >
          salir
        </button>
      </Stack>
    </Stack>
  );
}

export default Sidebar;
