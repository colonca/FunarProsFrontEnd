import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const NivelesEstudiosServices = {};

NivelesEstudiosServices.get = async () => {
  const { data } = await axios.get(`${baseUrl}/term/niveles-estudios`);
  return data;
};
export default NivelesEstudiosServices;
