import * as Yup from 'yup';

const validationDataDocuments = Yup.object().shape({
  soporte_documento: Yup.string().required('El documento es requerido')
});
export default validationDataDocuments;
