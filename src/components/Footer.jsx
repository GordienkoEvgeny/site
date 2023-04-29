import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useTranslation } from 'react-i18next';
// import paths from '../paths';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__content-inner">
            <a className="footer__link" href="https://github.com/GordienkoEvgeny">{`Created by ${t('created')}`}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
