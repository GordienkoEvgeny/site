import React, { useEffect } from 'react';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useDispatch, useSelector } from 'react-redux';
import paths from '../paths';
// import { useAuthorization } from '../hooks/hooks';
import { actions as usersActions, selectors as usersSelectors } from '../slices/usersSlice.js';

const MainPage = () => {
  // const auth = useAuthorization();
  const dispatch = useDispatch();
  useEffect(() => {
    const responseUsers = async () => {
      try {
        // const localStorageData = JSON.parse(localStorage.getItem('user'));
        const { data } = await axios.get(paths.usersPath());
        console.log(data, 'data');
        dispatch(usersActions.addUsers(data.data));
        // dispatch(messagesActions.addMessages(data.messages));
        // dispatch(channelsActions.setCurrentChannelId(data.currentChannelId));
      } catch (err) {
        // eslint-disable-next-line functional/no-conditional-statements
        if (err.response.status === 404) {
          console.log(err);
          // auth.logOut();
        }
      }
    };
    responseUsers();
  }, [dispatch]);
  const { users } = useSelector((state) => {
    console.log(state, 'STATE');
    const allUsers = usersSelectors.selectAll(state);
    return { users: allUsers };
  });
  return (
    <div className="main">
      <div className="container">
        <div className="main__team-list">
          <div className="main__team-list-head">
            <button type="button" className="main__btn-esc">
              Выход
            </button>
            <div className="main__head-title">
              Наша команда
            </div>
            <div className="main__head-text">
              Это опытные специалисты, хорошо разбирающиеся во всех задачах,
              которые ложатся на их плечи, и умеющие находить выход из любых,
              даже самых сложных ситуаций.
            </div>
          </div>
          <div className="main__team-list-items">
            <ul className="main__team-items-box">
              {users && users.map((item) => {
                console.log(item, 'ITEM');
                return (
                  <li className="main__item-card" key={item.id}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" className="main__item-link">
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
