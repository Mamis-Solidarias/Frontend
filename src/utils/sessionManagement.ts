import { NextRouter } from 'next/router';

export const userIsLoggedIn = () => {
  return !!localStorage.getItem('user');
};

export const redirectToLogin = (router: NextRouter) => {
  router.push('/login');
};

// Logged in but without permission
export const hasNoPermission = (err: any) => {
  return err.status === 403;
};

// Not Logged in
export const isNotLoggedIn = (err: any) => {
  return err.status === 401;
};