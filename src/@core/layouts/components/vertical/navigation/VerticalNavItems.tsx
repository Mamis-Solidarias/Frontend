// ** Types Import
import { Settings } from 'src/@core/context/settingsContext';
import { NavLink, NavSectionTitle, VerticalNavItemsType } from 'src/@core/layouts/types';
import { verifyJwt } from 'src/API/Users/initialization';

// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink';
import VerticalNavSectionTitle from './VerticalNavSectionTitle';

interface Props {
  settings: Settings;
  navVisible?: boolean;
  groupActive: string[];
  currentActiveGroup: string[];
  verticalNavItems?: VerticalNavItemsType;
  saveSettings: (values: Settings) => void;
  setGroupActive: (value: string[]) => void;
  setCurrentActiveGroup: (item: string[]) => void;
}

const resolveNavItemComponent = (item: NavLink | NavSectionTitle, allowed: string[]) => {
  const allowedServiceState = allowed.map(permission => {
    const service = permission.split('/')[0];
    const state = permission.split('/')[1];

    return { service, state };
  });
  if (!item.service || allowedServiceState.find(permission => permission.service === item.service))
    if ((item as NavSectionTitle).sectionTitle) return VerticalNavSectionTitle;

  return VerticalNavLink;
};

const VerticalNavItems = (props: Props) => {
  // ** Props
  const { verticalNavItems } = props;

  const RenderMenuItems = verticalNavItems?.map((item: NavLink | NavSectionTitle, index: number) => {
    if (typeof window !== 'undefined' && !!localStorage.getItem('user')) {
      const TagName: any = resolveNavItemComponent(item, verifyJwt(localStorage.getItem('user') as string).permissions);

      return <TagName {...props} key={index} item={item} />;
    } else return <div key='none'></div>;
  });

  if (typeof window !== 'undefined' && !!localStorage.getItem('user')) {
    return <>{RenderMenuItems}</>;
  } else return <></>;
};

export default VerticalNavItems;
