import * as Yup from 'yup';

const validationInstitucion = Yup.object().shape({
  nit: Yup.string().required('El nit es requerido'),
  telefono: Yup.number()
    .required('El telefono es requerido')
    .typeError('Formato invalido'),
  fechaConvenio: Yup.date().required('La fecha es requerida'),
  tipo: Yup.object().required('El tipo es requerido'),
  nombres: Yup.string().required('El nombre  es requerido'),
  email: Yup.string()
    .required('El correo es  requerido')
    .email('Debe ser un email valido, ejemplo (ejemplo@ejemplo.com)'),
  departamento: Yup.object().required('El departamento es requerido'),
  municipio: Yup.object().required('El municipio es requerido')
});
export default validationInstitucion;
