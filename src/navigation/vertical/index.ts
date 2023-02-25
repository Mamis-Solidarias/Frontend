// ** Icon imports
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline';
import HomeGroup from 'mdi-material-ui/HomeGroup';
import HomeAccount from 'mdi-material-ui/HomeAccount';
import AccountGroup from 'mdi-material-ui/AccountGroup';
import BackpackIcon from '@mui/icons-material/Backpack';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types';

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Usuarios',
      service: 'Users'
    },
    {
      title: 'Administrar Usuarios',
      icon: AccountCogOutline,
      path: '/usuarios',
      service: 'Users'
    },
    {
      sectionTitle: 'Personas',
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
      service: 'Donors'
    },
    {
      sectionTitle: 'Campañas',
      service: ''
    },
    {
      icon: BackpackIcon,
      title: 'Una Mochi',
      path: '/mochi',
      service: 'Campaigns'
    },
    {
      icon: HandshakeIcon,
      title: 'Juntos a la Par',
      path: '/juntos',
      service: 'Campaigns'
    },
    {
      icon: AcUnitIcon,
      title: 'Abrigaditos',
      path: '/abrigaditos',
      service: 'Campaigns'
    },
    {
      icon: AttachMoneyIcon,
      title: 'Donaciones',
      path: '/donaciones',
      service: 'Donations'
    },
  ];
};

export default navigation;
