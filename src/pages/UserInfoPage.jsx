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
            <p>
              Клиенты видят эксперта по вопросам разработки комплексных решений финансовых
              продуктов, включая такие аспекты, как организационная структура, процессы,
              аналитика и ИТ-компоненты.Помогает клиентам лучше понимать структуру
              рисков их бизнеса, улучшать процессы за счет применения
              новейших технологий и увеличивать продажи, используя самые
              современные аналитические инструменты.
            </p>
            <p>
              В работе с клиентами недостаточно просто решить конкретную
              проблему или помочь справиться с трудностями.
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Не менее важно уделять внимание обмену знаниями: "Один из самых
              позитивных моментов — это осознание того,
              что ты помог клиенту перейти на совершенно новый
              уровень компетентности, уверенность в том,
              что после окончания проекта у клиента есть все необходимое, чтобы дальше
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              развиваться самостоятельно".
            </p>
            <p>
              Помимо разнообразных проектов для клиентов финансового сектора,
              ведет активную предпринимательскую деятельность. Является
              совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей
              инновационный подход к красоте, а также инвестором других бизнес-проектов.
            </p>
          </div>
          <div className="user-info__contacts">
            <div className="user-info__email">
              <img className="user-info__email-img" src={email} alt="электронная почта" />
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="user-info__user-email" href={`mailto:${currentUser.email}`}>
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
