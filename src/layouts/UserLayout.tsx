// ** React Imports
import {ReactNode, useEffect, useState} from 'react';

// ** MUI Imports
import {Theme} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Layout Imports
// !Do not remove this Layout import
import VerticalLayout from 'src/@core/layouts/VerticalLayout';

// ** Navigation Imports
// ** Component Import
import VerticalAppBarContent from './components/vertical/AppBarContent';

// ** Hook Import
import {useSettings} from 'src/@core/hooks/useSettings';

interface Props {
  children: ReactNode;
}

const UserLayout = ({children}: Props) => {
  // ** Hooks
  const {settings, saveSettings} = useSettings();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  useEffect(() => {
    setIsMounted(true);
  }, []);


  if (!isMounted) {
    return <></>
  } else
    return (
      <VerticalLayout
        hidden={hidden}
        settings={settings}
        saveSettings={saveSettings}
        verticalAppBarContent={(
          props // AppBar Content
        ) => (
          <VerticalAppBarContent
            hidden={hidden}
            settings={settings}
            saveSettings={saveSettings}
            toggleNavVisibility={props.toggleNavVisibility}
          />
        )}
      >
        {children}
      </VerticalLayout>
    );
};

export default UserLayout;
