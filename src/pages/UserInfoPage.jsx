import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import phone from '../components/images/phone.png';
import email from '../components/images/email.png';
import { selectors as usersSelectors } from '../slices/usersSlice';
import paths from '../paths';
import EscButton from '../components/EscapeButton';

const UserInfo = () => {
  const { t } = useTranslation();
  const redirect = useNavigate();
  // eslint-disable-next-line consistent-return
  const { currentUser } = useSelector((state) => {
    console.log(state, 'STATE');
    const allUsers = usersSelectors.selectAll(state);
    console.log(allUsers, 'allUsers');
    const filteredUser = allUsers.filter((item) => state.users.currentUserId === item.id);
    return { currentUser: filteredUser[0] };
  });
  console.log(currentUser);
  return (
    <div className="user-info">
      <div className="container">
        <div className="user-info__head">
          <button className="user-info__btn-back" type="button" onClick={() => redirect(paths.mainPagePath())}>
            {t('back')}
          </button>
          <img src={currentUser.avatar} alt="" className="user-info__head-photo" />
          <div className="user-info__head-inner">
            <div className="user-info__head-title">
              {`${currentUser.first_name} ${currentUser.last_name}`}
            </div>
            <div className="user-info__head-role">
              {t('user')}
            </div>
          </div>
          <EscButton />
        </div>
        <div className="user-info__about">
          <div className="user-info__about-text">
            text
          </div>
          <div className="user-info__contacts">
            {/* <div className="user-info__phone"> */}
            {/*  <img className="user-info__phone-img" src={phone} alt="телефон" /> */}
            {/*  /!* eslint-disable-next-line jsx-a11y/anchor-is-valid *!/ */}
            {/*  <a className="user-info__user-phone" href=""> */}
            {/*    +7 (954) 333-44-55 */}
            {/*  </a> */}
            {/* </div> */}
            <div className="user-info__email">
              <img className="user-info__email-img" src={email} alt="электронная почта" />
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="user-info__user-email" href="">
                {currentUser.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
