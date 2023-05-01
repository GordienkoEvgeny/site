import React, { useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import paths from '../paths';
import { actions as usersActions, selectors as usersSelectors } from '../slices/usersSlice.js';
import EscButton from '../components/EscapeButton';
import { useAuthorization } from '../hooks/hooks';

const MainPage = () => {
  const { t } = useTranslation();
  const auth = useAuthorization();
  const redirect = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const responseUsers = async () => {
      try {
        const { data } = await axios.get(paths.usersPath());
        console.log(data, 'data');
        dispatch(usersActions.addUsers(data.data));
      } catch (err) {
        // eslint-disable-next-line functional/no-conditional-statements
        if (err.response.status === 404) {
          console.log(err);
          auth.logOut();
        }
      }
    };
    responseUsers();
  }, [auth, dispatch]);
  const { users } = useSelector((state) => {
    const allUsers = usersSelectors.selectAll(state);
    return { users: allUsers };
  });
  return (
    <div className="main">
      <div className="container">
        <div className="main__team-list">
          <div className="main__team-list-head">
            <EscButton />
            <div className="main__head-title">
              {t('ourTeam')}
            </div>
            <div className="main__head-text">
              {t('description')}
            </div>
          </div>
          <div className="main__team-list-items">
            <ul className="main__team-items-box">
              {users && users.map((item) => {
                console.log(item, 'ITEM');
                return (
                  <li className="main__item-card" key={item.id}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      href="#"
                      className="main__item-link"
                      onClick={() => {
                        dispatch(usersActions.setCurrentUserId(item.id));
                        redirect(paths.userPagePath(), { item });
                      }}
                    >
                      <img className="main__item-img" src={item.avatar} alt="" />
                      <div className="main__full-name-item">
                        {`${item.first_name} ${item.last_name}`}
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
