import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const InstitucionesServices = {};
InstitucionesServices.get = async (page = 1) => {
  const { data } = await axios.get(`${baseUrl}/institucion?page=${page}`);
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
InstitucionesServices.delete = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/institucion/delete/${id}`);
  return data;
};
export default InstitucionesServices;
