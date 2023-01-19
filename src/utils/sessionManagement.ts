import { NextRouter } from 'next/router';
import Cookies from 'js-cookie';
import Role from 'src/types/users/Role';

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

export const getUserRolesLocal = () => {
  return userIsLoggedIn() ? JSON.parse(localStorage.getItem('user') as string).roles : null;
};

export const hasWriteAccess = (service: string) => {
  const adminRoles = getUserRolesLocal();
  let hasIt = false;
  adminRoles.forEach((role: Role) => {
    if (role.service === service && role.canWrite) {
      hasIt = true;
    }
  });

  return hasIt;
};

export const hasReadAccess = (service: string) => {
  const adminRoles = getUserRolesLocal();
  let hasIt = false;
  adminRoles.forEach((role: Role) => {
    if (role.service === service && role.canRead) {
      hasIt = true;
    }
  });

  return hasIt;
};
