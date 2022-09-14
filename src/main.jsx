import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import NiceModal from '@ebay/nice-modal-react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import './index.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import App from './App';
import keycloak from './utils/keycloack';
import { OidcSecure } from './components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <NiceModal.Provider>
      <ReactKeycloakProvider authClient={keycloak}>
        <OidcSecure>
          <Router>
            <App />
          </Router>
        </OidcSecure>
      </ReactKeycloakProvider>
    </NiceModal.Provider>
  </LocalizationProvider>
);
