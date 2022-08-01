import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const MunicipiosServices = {};

MunicipiosServices.get = async (id) => {
  const { data } = await axios.get(`${baseUrl}/term/municipios/${id}`);
  return data;
};
export default MunicipiosServices;
