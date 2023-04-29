import * as Yup from 'yup';

const validation = (schema, translate) => {
  const vSchema = (errName, minCountSymbol, maxCountSymbol, t) => Yup.string().trim().min(
    minCountSymbol,
    t(errName),
  ).max(maxCountSymbol, t('errNameSymbol20'))
    .required(t('errField'));
  const confirmPass = schema ? schema.passwordConfirmation : null;
  const count = schema ? 6 : 4;
  return ({
    validationSchema: Yup.object().shape({
      username: vSchema('errNameSymbol3', count, 20, translate),
      password: vSchema('errPassSymbol6', count, 20, translate),
      passwordConfirmation: confirmPass,
    }),
  });
};

export default validation;
