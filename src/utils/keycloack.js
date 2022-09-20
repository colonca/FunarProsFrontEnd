import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://keycloack.fundacionarbolprospero.com/auth',
  realm: 'funarpro',
  clientId: 'funarpro-web'
});

export default keycloak;
