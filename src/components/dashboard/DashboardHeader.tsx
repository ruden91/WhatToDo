import * as React from 'react';

import DashboardHeaderLogo from 'components/dashboard/DashboardHeaderLogo';
import DashboardHeaderItems from 'containers/dashboard/DashboardHeaderItems';
import './DashboardHeader.scss';

interface DashboardHeaderProps {
  onOpenDashboardModal: ((
    e: React.MouseEvent<HTMLElement>,
    target: string
  ) => void);
}

const DashboardHeader: React.SFC<DashboardHeaderProps> = props => (
  <header className="wtd-dashboard-header">
    <div className="wtd-container">
      <div className="wtd-dashboard-header__inner">
        <DashboardHeaderLogo />
        <DashboardHeaderItems
          onOpenDashboardModal={props.onOpenDashboardModal}
        />
      </div>
    </div>
  </header>
);
export default DashboardHeader;
