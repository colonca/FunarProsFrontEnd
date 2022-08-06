import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const InstitucionesServices = {};
InstitucionesServices.get = async () => {
  const { data } = await axios.get(`${baseUrl}/institucion`);
  return data;
};
InstitucionesServices.post = async (request) => {
  const { data } = await axios.post(`${baseUrl}/institucion`, request);
  return data;
};
InstitucionesServices.update = async (request) => {
  const { data } = await axios.put(
    `${baseUrl}/institucion/update/${request.id}`,
    request
  );
  return data;
};
export default InstitucionesServices;
