import { NextRouter } from 'next/router';
import Cookies from 'js-cookie';

export const userIsLoggedIn = () => {
  return !!Cookies.get('MamisSolidarias.Auth');
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
