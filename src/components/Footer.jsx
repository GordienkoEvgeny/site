import React from 'react';
import { useTranslation } from 'react-i18next';

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
