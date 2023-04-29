import React, { useState } from 'react';
import { useFormik } from 'formik';
// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logInSignUpSchema from '../validation/validationSchemaLogInSignUp';
import paths from '../paths';
import { useAuthorization } from '../hooks/hooks';
import Input from '../components/Input';

const Login = () => {
  const [successAuth, setSuccessAuth] = useState(false);
  const [errorAuth, setErrorAuth] = useState(null);
  const redirect = useNavigate();
  const { t } = useTranslation();
  const auth = useAuthorization();
  const formAlert = cn({ 'alert-danger form-control is-invalid': successAuth, alert: successAuth });
  const formik = useFormik({
    initialValues: {
      loginUserName: '',
      password: '',
    },
    validationSchema: logInSignUpSchema.validationSchema,
    onSubmit: async (values) => {
      const dataToSend = { username: values.loginUserName, password: values.password };
      try {
        const response = await axios.post(paths.loginPath(), dataToSend);
        localStorage.setItem('user', JSON.stringify(response.data));
        auth.logIn();
        redirect(paths.chatPath());
      } catch (err) {
        // eslint-disable-next-line functional/no-conditional-statements
        if (err.response.status === 401) {
          setSuccessAuth(true);
          setErrorAuth(t('errNamePass'));
        }
      }
    },
  });
  return (
    <div className="login">
      <div className="container">
        <div className="login__content">
          <form action="" className="login__form">
            <h2 className="login__title">{t('logIn')}</h2>
            <Input formik={formik} type="loginUserName" focused />
            <Input formik={formik} type="email" />
            <Input formik={formik} type="password" />
            <div className={formAlert} role="alert">
              {errorAuth}
            </div>
            <button onSubmit={formik.handleSubmit} disabled={formik.isSubmitting} type="submit" className="login__form-btn login__form-btn--text">{t('logIn')}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
