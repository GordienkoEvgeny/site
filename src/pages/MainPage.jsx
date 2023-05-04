import React, { useEffect, useState } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import paths from '../paths';
import { actions as usersActions, selectors as usersSelectors } from '../slices/usersSlice.js';
import EscButton from '../components/EscapeButton';
import { useAuthorization } from '../hooks/hooks';
import arrow from '../components/images/arrow.png';
import likeDisable from '../components/images/likeDisable.png';
import like from '../components/images/like.png';

const MainPage = () => {
  const [showMore, setShowMore] = useState(false);
  const [renderState, setRenderState] = useState(1);
  const { t } = useTranslation();
  const auth = useAuthorization();
  const redirect = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const responseUsers = async (num) => {
      try {
        const { data } = await axios.get(paths.usersPath(num));
        dispatch(usersActions.addUsers(data.data));
      } catch (err) {
        // eslint-disable-next-line functional/no-conditional-statements
        if (err.response.status === 404) {
          console.log(err);
          auth.logOut();
        }
      }
    };
    responseUsers(1);
    // eslint-disable-next-line functional/no-conditional-statements
    if (showMore) {
      responseUsers(2);
    }
  }, [auth, dispatch, showMore]);
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
              {users && users.map((item) => (
                <li className="main__item-card" key={item.id}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a
                    href="#"
                    className="main__item-link"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(usersActions.setCurrentUserId(item.id));
                      redirect(paths.userPagePath(), { item });
                    }}
                  >
                    <img className="main__item-img" src={item.avatar} alt="" />
                    <div className="main__full-name-item">
                      {`${item.first_name} ${item.last_name}`}
                    </div>
                  </a>
                  <div className="main__like">
                    <button
                      className="main__like-item"
                      type="button"
                      onClick={() => {
                        // eslint-disable-next-line functional/no-conditional-statements
                        if (sessionStorage.getItem(`key${item.id}`)) {
                          sessionStorage.removeItem(`key${item.id}`);
                          setRenderState(renderState + 1);
                          // eslint-disable-next-line functional/no-conditional-statements
                        } else {
                          sessionStorage.setItem(`key${item.id}`, 'likeActive');
                          setRenderState(renderState + 1);
                        }
                      }}
                    >
                      <img
                        className="main__like-img"
                        src={sessionStorage.getItem(`key${item.id}`) === 'likeActive' ? like : likeDisable}
                        alt="like"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="main__show-more">
              <button className={showMore ? 'hide' : 'main__show-more-btn'} type="button" onClick={() => { setShowMore(true); }}>
                <p className="main__show-more-text">Показать еще</p>
                <img src={arrow} alt="показать еще" className="main__show-more-image" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;
