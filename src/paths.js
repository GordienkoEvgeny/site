const apiPath = '/api/v1';

export default {
  signupPath: () => [apiPath, '/signup'].join('/'),
  loginPath: () => [apiPath, 'login'].join('/'),
  loginPagePath: () => '/login',
  usersPath: () => [apiPath, 'data'].join('/'),
  chatPath: () => '/',
};
