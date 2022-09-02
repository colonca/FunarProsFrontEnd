import axios from 'axios';
import { jsonToFormData } from '../utils/services';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const EmpresasServices = {};
EmpresasServices.get = async () => {
  const { data } = await axios.get(`${baseUrl}/empresas`);
  return data;
};
EmpresasServices.post = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.post(`${baseUrl}/empresas`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      type: 'formData'
    }
  });
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
