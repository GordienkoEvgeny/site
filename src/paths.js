const apiPath = 'https://reqres.in/api';

export default {
  signupPath: () => '/register',
  loginPath: () => [apiPath, 'login'].join('/'),
  loginPagePath: () => '/login',
  usersPath: (num) => [apiPath, `users?page=${num}`].join('/'),
  mainPagePath: () => '/',
  userPagePath: () => '/user',
};
