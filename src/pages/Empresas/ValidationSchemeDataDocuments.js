import * as Yup from 'yup';

const validationDataDocumentsEmpresa = Yup.object().shape({
  document: Yup.object().required('Este campo es requerido'),
  file: Yup.string().required('Documento requerido')
});
export default validationDataDocumentsEmpresa;
