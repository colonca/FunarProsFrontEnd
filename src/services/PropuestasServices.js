import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const PropuestasServices = {};
PropuestasServices.get = async (page = 1) => {
  const { data } = await axios.get(`${baseUrl}/propuestas?page=${page}`);
  return data;
};
PropuestasServices.delete = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/propuestas/delete/${id}`);
  return data;
};
PropuestasServices.getId = async (id) => {
  const { data } = await axios.get(`${baseUrl}/propuestas/show/${id}`);
  return data;
};
PropuestasServices.post = async (request) => {
  const { data } = await axios.post(`${baseUrl}/propuestas`, request);
  return data;
};

export default PropuestasServices;
