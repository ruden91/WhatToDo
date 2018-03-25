import * as React from 'react';

import './DashboardAsideMenu.scss';

interface DashboardAsideMenuProps {
  onSortBySpecificFilter: ((standard: string) => void);
}

const DashboardAsideMenu: React.SFC<DashboardAsideMenuProps> = props => (
  <aside className="wtd-dashboard-aside-menu">
    <ul className="wtd-dashboard-aside-menu__panels">
      <li
        className="wtd-dashboard-aside-menu__panel"
        onClick={() => props.onSortBySpecificFilter('inbox')}
      >
        <span className="wtd-dashboard-aside-menu__panel-icon">
          <i className="fas fa-inbox" />
        </span>
        <span className="wtd-dashboard-aside-menu__panel-title">관리함</span>
        <small>1</small>
      </li>
      <li
        className="wtd-dashboard-aside-menu__panel"
        onClick={() => props.onSortBySpecificFilter('today')}
      >
        <span className="wtd-dashboard-aside-menu__panel-icon">
          <i className="far fa-calendar" />
        </span>
        <span className="wtd-dashboard-aside-menu__panel-title">오늘</span>
        <small>2</small>
      </li>
      <li
        className="wtd-dashboard-aside-menu__panel"
        onClick={() => props.onSortBySpecificFilter('days')}
      >
        <span className="wtd-dashboard-aside-menu__panel-icon">
          <i className="fas fa-calendar-alt" />
        </span>
        <span className="wtd-dashboard-aside-menu__panel-title">다음 7일</span>
        <small>3</small>
      </li>
    </ul>
  </aside>
);

export default DashboardAsideMenu;
