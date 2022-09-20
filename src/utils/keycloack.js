import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://keycloak.fundacionarbolprospero.com//auth',
  realm: 'funarpro',
  clientId: 'funarpro-web'
});

export default keycloak;
