// ** Icon imports
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline';
import HomeGroup from 'mdi-material-ui/HomeGroup';
import HomeAccount from 'mdi-material-ui/HomeAccount';
import AccountGroup from 'mdi-material-ui/AccountGroup';

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types';

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Grupos'
    },
    {
      icon: AccountGroup,
      title: 'Beneficiarios',
      path: '/beneficiarios'
    },
    {
      icon: HomeAccount,
      title: 'Familias',
      path: '/familias'
    },
    {
      icon: HomeGroup,
      title: 'Comunidades',
      path: '/comunidades'
    },
    {
      sectionTitle: 'Usuarios'
    },
    {
      title: 'Administrar Usuarios',
      icon: AccountCogOutline,
      path: '/usuarios'
    }
  ];
};

export default navigation;
