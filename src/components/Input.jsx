import React, { useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';

const keysTranslation = {
  loginUserName: 'placeholderName',
  username: 'placeholderRegName',
  password: 'placeholderPass',
  passwordConfirmation: 'placeholderConfirmPass',
  name: 'nameChannel',
};

const Input = ({ formik, type, focused }) => {
  const inputRef = useRef();
  const { t } = useTranslation();
  useEffect(() => {
    // eslint-disable-next-line functional/no-conditional-statements
    if (focused) {
      inputRef.current.focus();
    }
  }, [focused]);
  return (
    <div className="mb-4">
      <input
        className={formik.touched[type] && formik.errors[type] ? 'form-control is-invalid' : 'form-control'}
        required=""
        id={type}
        name={type}
        onChange={formik.handleChange}
        placeholder={t(keysTranslation[type])}
        ref={inputRef}
      />
      <label
        className="form-label visually-hidden text-muted"
        htmlFor={type}
      >
        {t(keysTranslation[type])}
      </label>
      {formik.touched[type] && formik.errors[type] ? (
        <div className="tal text-danger">{formik.errors[type]}</div>
      ) : null}
    </div>
  );
};
export default Input;
