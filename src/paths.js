const apiPath = 'https://reqres.in/api';

export default {
  signupPath: () => [apiPath, '/signup'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
  loginPagePath: () => '/login',
  usersPath: () => [apiPath, 'data'].join('/'),
  chatPath: () => '/',
};
