import * as Yup from 'yup';

const validation = (schema, t) => {
  const confirmPass = schema ? schema.passwordConfirmation : null;
  return ({
    validationSchema: Yup.object().shape({
      username: Yup.string().trim().min(
        3,
        t('errNameSymbol3'),
      )
        .max(20, t('errNameSymbol20'))
        .required(t('errField')),
      email: Yup.string().email(t('emailErr')).required(t('errField')),
      password: Yup.string().trim().min(
        6,
        t('errPassSymbol6'),
      )
        .max(20, t('errPassSymbol20'))
        .required(t('errField')),
      passwordConfirmation: confirmPass,
    }),
  });
};

export default validation;
