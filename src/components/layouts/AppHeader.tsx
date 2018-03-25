import * as React from 'react';

import AppLogo from 'components/appUtils/AppLogo';
import AppNavigation from 'components/appUtils/AppNavigation';

// component style
import './AppHeader.scss';

interface AppHeaderProps {
  openIntroModal: ((e: React.MouseEvent<HTMLElement>, target: string) => void);
}

const AppHeader: React.SFC<AppHeaderProps> = props => (
  <header className="wtd-header js-wtd-header">
    <div className="wtd-header__floating">
      <div className="wtd-container">
        <div className="wtd-header__inner">
          <AppLogo />
          <AppNavigation openIntroModal={props.openIntroModal} />
        </div>
      </div>
    </div>
  </header>
);

export default AppHeader;
