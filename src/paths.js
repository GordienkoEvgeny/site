const apiPath = 'https://reqres.in/api';

export default {
  signupPath: () => '/signup',
  loginPath: () => [apiPath, 'login'].join('/'),
  loginPagePath: () => '/login',
  usersPath: () => [apiPath, 'users?page=1'].join('/'),
  mainPagePath: () => '/',
};
