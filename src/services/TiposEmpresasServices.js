import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const TiposEmpresasServices = {};

TiposEmpresasServices.get = async () => {
  const { data } = await axios.get(`${baseUrl}/term/tipos`);
  return data;
};
export default TiposEmpresasServices;
