import React, { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
import show from './images/show.png';

const keysTranslation = {
  loginUserName: 'placeholderName',
  username: 'placeholderRegName',
  password: 'placeholderPass',
  passwordConfirmation: 'placeholderConfirmPass',
  name: 'nameChannel',
  email: 'Электронная почта',
};

const Input = ({ formik, type, focused }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef();
  const { t } = useTranslation();
  useEffect(() => {
    // eslint-disable-next-line functional/no-conditional-statements
    if (focused) {
      inputRef.current.focus();
    }
  }, [focused]);
  const toggleShowPassword = () => {
    // eslint-disable-next-line functional/no-conditional-statements
    if (showPassword) {
      setShowPassword(false);
      // eslint-disable-next-line functional/no-conditional-statements
    } else {
      setShowPassword(true);
    }
  };
  return (
    <div className="login__form-input-group">
      <label
        className="login__form-label visually-hidden text-muted"
        htmlFor={type}
      >
        {t(keysTranslation[type])}
      </label>
      <input
        className={formik.touched[type] && formik.errors[type] ? 'login__form-input is-invalid' : 'login__form-input'}
        required=""
        id={type}
        name={type}
        onChange={formik.handleChange}
        placeholder={t(keysTranslation[type])}
        ref={inputRef}
        type={(type === 'password' && showPassword) || (type === 'passwordConfirmation' && showPassword) ? 'password' : 'text'}
      />
      {type === 'password' || type === 'passwordConfirmation' ? (
        <div className="button-showPass-box">
          <button className="showPass" type="button" onClick={() => { toggleShowPassword(); }}>
            <img src={show} alt="показать пароль" className="showPass__img" />
          </button>
        </div>
      ) : '' }
      {formik.touched[type] && formik.errors[type] ? (
        <div className="tal text-danger">{formik.errors[type]}</div>
      ) : null}
    </div>
  );
};
export default Input;
