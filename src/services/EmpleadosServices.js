import axios from 'axios';
import { jsonToFormData } from '../utils/services';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const EmpleadosServices = {};
EmpleadosServices.get = async () => {
  const { data } = await axios.get(`${baseUrl}/empleados`);
  return data;
};
EmpleadosServices.getId = async (id) => {
  const { data } = await axios.get(`${baseUrl}/empleados/show/${id}`);
  return data;
};
EmpleadosServices.post = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.post(`${baseUrl}/empleados`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      type: 'formData'
    }
  });
  return data;
};
EmpleadosServices.update = async (request) => {
  const formData = jsonToFormData(request);
  const { data } = await axios.post(
    `${baseUrl}/empleados/update/${request.id}?_method=put`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        type: 'formData'
      }
    }
  );
  return data;
};
export default EmpleadosServices;
