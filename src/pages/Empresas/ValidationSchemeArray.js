import * as Yup from 'yup';

const ValidationSchemeArray = Yup.object().shape({
  files: Yup.array().min(1, 'Minimo debes agregar un archivo')
});
export default ValidationSchemeArray;
