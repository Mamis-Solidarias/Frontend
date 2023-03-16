// ** Types Import
import {Settings} from 'src/@core/context/settingsContext';
import {NavLink, NavSectionTitle} from 'src/@core/layouts/types';

// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink';
import VerticalNavSectionTitle from './VerticalNavSectionTitle';
import navigation from "src/navigation/vertical";

interface Props {
  settings: Settings;
  navVisible?: boolean;
  groupActive: string[];
  currentActiveGroup: string[];
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
  const RenderMenuItems = navigation.map((item: NavLink | NavSectionTitle, index: number) => {
    const TagName: any = resolveNavItemComponent(item, JSON.parse(localStorage.getItem('user') as string).roles);

    return <TagName {...props} key={index} item={item}/>;
  });

  return <div>{RenderMenuItems}</div>;
};

export default VerticalNavItems;
