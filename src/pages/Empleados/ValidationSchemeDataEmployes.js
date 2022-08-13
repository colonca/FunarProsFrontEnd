import * as Yup from 'yup';

const validationDataEmployes = Yup.object().shape({
  tipo_identificacion_id: Yup.object().required(
    'El tipo de documento es requerido'
  ),
  identificacion: Yup.number()
    .required('La identificación es requerida')
    .typeError('El formato no es valido, solo números'),
  fecha_expedicion_documento: Yup.date().required('La fecha es requerida'),
  nombres: Yup.string().required('Los nombres son es requeridos'),
  apellidos: Yup.string().required('Los apellidos son requeridos'),
  numero_telefono: Yup.number()
    .required('El telefono es requerido')
    .typeError('El formato no es valido, solo números'),
  genero_id: Yup.object().required('El tipo de genero es requerido'),
  email: Yup.string()
    .required('El correo es  requerido')
    .email('Debe ser un email valido, ejemplo (ejemplo@ejemplo.com)'),
  fecha_nacimiento: Yup.date().required('La fecha es requerida'),
  ocupacion: Yup.string().required('La ocupación es requerida'),
  nivel_escolaridad_id: Yup.object().required(
    'El nivel de escolaridad es requerido'
  ),
  direccion: Yup.string().required('La dirección es requerida')
});

export default validationDataEmployes;
