import {
  BrowserRouter as Router, Routes, Route,
  Navigate,
} from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import i18next from 'i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import { initReactI18next } from 'react-i18next';
import { useMemo, useState } from 'react';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import paths from './paths.js';
import resources from './locales/index.js';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignUpPage';
import { useAuthorization } from './hooks/hooks';
import { LoginContext } from './contexts/contexts';
import Footer from './components/Footer';

const AuthProv = ({ children }) => {
  const [authorizationStatus, setAuthorizationStatus] = useState(() => (
    Boolean(localStorage.getItem('user'))));
  const logIn = () => setAuthorizationStatus(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setAuthorizationStatus(false);
  };
  const auth = useMemo(() => ({
    authorizationStatus, logIn, logOut,
  }), [authorizationStatus]);
  return (
    <LoginContext.Provider value={auth}>
      {children}
    </LoginContext.Provider>
  );
};
const UsersListRoute = ({ children }) => {
  const auth = useAuthorization();
  return (
    auth.authorizationStatus ? children : <Navigate to={paths.loginPagePath()} />
  );
};
const App = () => {
  const i18n = i18next.createInstance();

  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
  return (
    <div className="App">
      <AuthProv>
        <Router>
          <Header />
          <Routes>
            <Route path="*" element={<NotFoundPage />} />
            <Route path={paths.loginPagePath()} element={<LoginPage />} />
            <Route path={paths.signupPath()} element={<SignupPage />} />
            <Route
              path={paths.mainPagePath()}
              element={(
                <UsersListRoute>
                  <MainPage />
                </UsersListRoute>
                    )}
            />
          </Routes>
          <Footer />
        </Router>
      </AuthProv>
    </div>
  );
};

export default App;
