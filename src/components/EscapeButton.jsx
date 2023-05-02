import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthorization } from '../hooks/hooks';

const EscButton = () => {
  const auth = useAuthorization();
  const { t } = useTranslation();
  return (
    <button className="btn-esc" type="button" onClick={() => { auth.logOut(); }}>
      {t('logOut')}
    </button>
  );
};
export default EscButton;
