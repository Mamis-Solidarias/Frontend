// ** Types Import
import { Settings } from 'src/@core/context/settingsContext';
import { NavLink, NavSectionTitle, VerticalNavItemsType } from 'src/@core/layouts/types';

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
  const { verticalNavItems } = props;

  const RenderMenuItems = verticalNavItems?.map((item: NavLink | NavSectionTitle, index: number) => {
    if (
      typeof window !== 'undefined' &&
      !!localStorage.getItem('user') &&
      JSON.parse(localStorage.getItem('user') as string).roles.length > 0
    ) {
      console.log(JSON.parse(localStorage.getItem('user') as string));
      const TagName: any = resolveNavItemComponent(item, JSON.parse(localStorage.getItem('user') as string).roles);

      return <TagName {...props} key={index} item={item} />;
    } else return <div key='none'></div>;
  });

  return <>{RenderMenuItems}</>;
};

export default VerticalNavItems;
