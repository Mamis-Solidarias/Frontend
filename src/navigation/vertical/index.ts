// ** Icon imports
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline';
import HomeGroup from 'mdi-material-ui/HomeGroup';
import HomeAccount from 'mdi-material-ui/HomeAccount';
import AccountGroup from 'mdi-material-ui/AccountGroup';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types';

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Grupos',
      service: ''
    },
    {
      icon: AccountGroup,
      title: 'Beneficiarios',
      path: '/beneficiarios',
      service: 'Beneficiaries'
    },
    {
      icon: HomeAccount,
      title: 'Familias',
      path: '/familias',
      service: 'Beneficiaries'
    },
    {
      icon: HomeGroup,
      title: 'Comunidades',
      path: '/comunidades',
      service: 'Beneficiaries'
    },
    {
      icon: VolunteerActivismIcon,
      title: 'Donantes',
      path: '/donantes',
      service: 'Beneficiaries'
    },
    {
      sectionTitle: 'Usuarios',
      service: 'Users'
    },
    {
      title: 'Administrar Usuarios',
      icon: AccountCogOutline,
      path: '/usuarios',
      service: 'Users'
    }
  ];
};

export default navigation;
