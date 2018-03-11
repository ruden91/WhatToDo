import React from 'react';

const DashboardAsideMenu = () => (
  <aside className="wtd-dashboard-aside-menu">
    <ul className="wtd-dashboard-aside-menu__panels">
      <li className="wtd-dashboard-aside-menu__panel current">
        <span className="wtd-dashboard-aside-menu__panel-icon"><i className="fas fa-inbox"></i></span>
        <span className="wtd-dashboard-aside-menu__panel-title">관리함</span> <small>7</small>
      </li>
      <li className="wtd-dashboard-aside-menu__panel">
        <span className="wtd-dashboard-aside-menu__panel-icon"><i className="far fa-calendar"></i></span>
        <span className="wtd-dashboard-aside-menu__panel-title">오늘</span> <small>3</small>
      </li>
      <li className="wtd-dashboard-aside-menu__panel">
        <span className="wtd-dashboard-aside-menu__panel-icon"><i className="fas fa-calendar-alt"></i></span>
        <span className="wtd-dashboard-aside-menu__panel-title">다음 7일</span> <small>1</small>
      </li>
    </ul>
  </aside>
)

export default DashboardAsideMenu;