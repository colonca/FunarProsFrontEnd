import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://18.221.165.181:8085/auth',
  realm: 'funarpro',
  clientId: 'funarpro-web'
});

export default keycloak;
