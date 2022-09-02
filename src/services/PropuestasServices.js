import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const PropuestasServices = {};
PropuestasServices.get = async () => {
  const { data } = await axios.get(`${baseUrl}/propuestas`);
  return data;
};
PropuestasServices.delete = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/propuestas/${id}`);
  return data;
};
export default PropuestasServices;
