// ** Types Import
import {Settings} from 'src/@core/context/settingsContext';
import {NavLink, NavSectionTitle, VerticalNavItemsType} from 'src/@core/layouts/types';
import {userIsLoggedIn} from 'src/utils/sessionManagement';

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

const resolveNavItemComponent = (
  item: NavLink | NavSectionTitle,
  allowed: { service: string; canWrite: boolean; canRead: boolean }[]
) => {
  if (!item.service || allowed.find(permission => permission.service === item.service))
    if ((item as NavSectionTitle).sectionTitle) return VerticalNavSectionTitle;

  return VerticalNavLink;
};

const VerticalNavItems = (props: Props) => {
  // ** Props
  const {verticalNavItems} = props;

  const RenderMenuItems = verticalNavItems?.map((item: NavLink | NavSectionTitle, index: number) => {
    const TagName: any = resolveNavItemComponent(item, JSON.parse(localStorage.getItem('user') as string).roles);

    return <TagName {...props} key={index} item={item}/>;
  });

  return <div>{RenderMenuItems}</div>;
};

export default VerticalNavItems;
