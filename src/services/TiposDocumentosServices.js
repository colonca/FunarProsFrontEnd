import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const TiposDocumentosServices = {};

TiposDocumentosServices.get = async () => {
  const { data } = await axios.get(`${baseUrl}/term/documentos`);
  return data;
};
export default TiposDocumentosServices;
