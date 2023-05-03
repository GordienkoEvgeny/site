import React from 'react';
import { useTranslation } from 'react-i18next';
import paths from '../paths';

const Header = () => {
  const { t } = useTranslation();
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <div className="header__logo">
            <a className="header__logo-text" href={paths.mainPagePath()}>
              {t('navbarName')}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
