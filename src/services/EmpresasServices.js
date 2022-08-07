import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const EmpresasServices = {};
EmpresasServices.get = async () => {
  const { data } = await axios.get(`${baseUrl}/empresas`);
  return data;
};
EmpresasServices.post = async (request) => {
  const { data } = await axios.post(`${baseUrl}/empresas`, request);
  return data;
};
EmpresasServices.update = async (request) => {
  const { data } = await axios.put(
    `${baseUrl}/empresas/update/${request.id}`,
    request
  );
  return data;
};
export default EmpresasServices;
