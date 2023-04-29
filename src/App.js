import {
  BrowserRouter as Router, Routes, Route,
  // Navigate,
} from 'react-router-dom';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import paths from './paths.js';
import resources from './locales/index.js';

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
      <Router>
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path={paths.loginPagePath()} element={<LoginPage />} />
          {/* <Route path={paths.signupPath()} element={<SignupPage />} /> */}
          {/* <Route */}
          {/*  path={paths.chatPath()} */}
          {/*  element={( */}
          {/*    <ChatRoute> */}
          {/*      <MainPage /> */}
          {/*    </ChatRoute> */}
          {/*          )} */}
          {/* /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
