import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import paths from '../paths';
import { useAuthorization } from '../hooks/hooks';
import Input from '../components/Input';
import validation from '../validation/loginSignupValidation';

const SignUp = () => {
  const [successAuth, setSuccessAuth] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);
  const redirect = useNavigate();
  const { t } = useTranslation();
  const auth = useAuthorization();
  const schema = {
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], t('errPasswordMatch'))
      .required(t('errPasswordMatch')),
  };
  const signupValidation = validation(schema, t);
  const formAlert = cn({ 'alert-danger form-control is-invalid mb-2': successAuth, alert: successAuth });
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: signupValidation.validationSchema,
    onSubmit: async (values) => {
      const dataToSend = {
        email: values.email,
        password: values.password,
      };
      try {
        const response = await axios.post(paths.loginPath(), dataToSend);
        localStorage.setItem('user', JSON.stringify(response.data));
        auth.logIn();
        redirect(paths.mainPagePath());
      } catch (err) {
        // eslint-disable-next-line functional/no-conditional-statements
        if (err.response.status === 400) {
          setSuccessAuth(true);
          setRegistrationError(t('errUserExists'));
        }
      }
    },
  });
  return (
    <div className="signup">
      <div className="container">
        <div className="signup__content">
          <form action="" className="signup__form" onSubmit={formik.handleSubmit}>
            <h2 className="signup__title">{t('registration')}</h2>
            <Input formik={formik} type="username" focused />
            <Input formik={formik} type="email" />
            <Input formik={formik} type="password" />
            <Input formik={formik} type="passwordConfirmation" />
            <div className={formAlert} role="alert">
              {registrationError}
            </div>
            <button onSubmit={formik.handleSubmit} disabled={formik.isSubmitting} type="submit" className="login__form-btn login__form-btn--text">{t('register')}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
