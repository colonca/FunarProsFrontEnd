import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const DocumentosEmpresasServices = {};

DocumentosEmpresasServices.get = async () => {
  const { data } = await axios.get(`${baseUrl}/term/tipos-documentos-empresas`);
  return data;
};
export default DocumentosEmpresasServices;
