import * as Yup from "yup";

const validationDataEmpresa = Yup.object().shape({
  departamento: Yup.object().required("El departamento es requerido"),
  municipio_id: Yup.object().required("El municipio es requerido"),
  nit: Yup.string().required("El nit es requerido"),
  nombre: Yup.string().required("El nombre  es requerido"),
  tipo_id: Yup.object().required("El tipo es requerido"),
  email: Yup.string()
    .required("El correo es  requerido")
    .email("Debe ser un email valido, ejemplo (ejemplo@ejemplo.com)"),
  telefono: Yup.number()
    .required("El telefono es requerido")
    .typeError("Formato invalido"),
  fecha_convenio: Yup.date().required("La fecha es requerida"),
});
export default validationDataEmpresa;
