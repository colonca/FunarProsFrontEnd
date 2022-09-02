import * as Yup from 'yup';

const validationSchemeDataProuesta = Yup.object().shape({
  empresaBeneficiaria: Yup.object().required(
    'La empresa beneficiaria es requerida'
  ),
  empresaContratista: Yup.object().required(
    'La empresa Contratista es requerida'
  ),
  numero_propuesta: Yup.string().required(
    'El numero del contrato es requerido'
  ),
  fecha_inicial: Yup.date().required('La fecha es requerida'),
  estado: Yup.object().required('El estado es requerido'),
  nombre: Yup.string().required('El nombre del contrato es requerido'),
  tipo: Yup.object().required('El tipo de contrato es requerido'),
  institucion_id: Yup.object().when('tipo', (tipo) => {
    if (tipo && tipo.value === 'PAE') {
      return Yup.array().min(
        1,
        'La institución es requerida, debe seleccionar al menos una'
      );
    }
  })
});
export default validationSchemeDataProuesta;
