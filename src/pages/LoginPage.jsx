import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import paths from '../paths';
import { useAuthorization } from '../hooks/hooks';
import Input from '../components/Input';
import validation from '../validation/loginSignupValidation';

const Login = () => {
  const [successAuth, setSuccessAuth] = useState(false);
  const [errorAuth, setErrorAuth] = useState(null);
  const redirect = useNavigate();
  const { t } = useTranslation();
  const auth = useAuthorization();
  const loginValidation = validation(null, t);
  const formAlert = cn({ 'alert-danger form-control is-invalid': successAuth, alert: successAuth });
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: loginValidation.validationSchema,
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
          setErrorAuth(t('errEmailPass'));
        }
      }
    },
  });
  return (
    <div className="login">
      <div className="container">
        <div className="login__content">
          <form action="" className="login__form" onSubmit={formik.handleSubmit}>
            <h2 className="login__title">{t('logIn')}</h2>
            <Input formik={formik} type="username" focused />
            <Input formik={formik} type="email" />
            <Input formik={formik} type="password" />
            <div className={formAlert} role="alert">
              {errorAuth}
            </div>
            <button onSubmit={formik.handleSubmit} disabled={formik.isSubmitting} type="submit" className="login__form-btn login__form-btn--text">{t('logIn')}</button>
          </form>
          <div className="registration__content">
            <div className="registration__content-inner">
              <span className="registration__content-text">{t('noAccount')}</span>
              <a className="registration__link" href={paths.signupPath()}>{t('registration')}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
