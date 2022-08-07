import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const EmpleadosServices = {};
EmpleadosServices.get = async () => {
  const { data } = await axios.get(`${baseUrl}/empleados`);
  return data;
};
EmpleadosServices.post = async (request) => {
  const { data } = await axios.post(`${baseUrl}/empleados`, request);
  return data;
};
EmpleadosServices.update = async (request) => {
  const { data } = await axios.put(
    `${baseUrl}/empleados/update/${request.id}`,
    request
  );
  return data;
};
export default EmpleadosServices;
