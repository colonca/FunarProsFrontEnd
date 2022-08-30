import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const EstadosServices = {};

EstadosServices.get = async () => {
  const { data } = await axios.get(`${baseUrl}/term/estados`);
  return data;
};
export default EstadosServices;
