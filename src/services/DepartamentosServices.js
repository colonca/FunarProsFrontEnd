import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const DepartamentosServices = {};

DepartamentosServices.get = async () => {
  const { data } = await axios.get(`${baseUrl}/term/departamentos`);
  return data;
};
export default DepartamentosServices;
