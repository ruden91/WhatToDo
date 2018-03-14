import React from 'react';

const DashboardAsideMenu = ({ togglePanelComponent, handlePanels, totalCount, todayCount, weekCount }) => (
  <aside className="wtd-dashboard-aside-menu">
    <ul className="wtd-dashboard-aside-menu__panels">
        <li 
          className={`wtd-dashboard-aside-menu__panel ${togglePanelComponent === 'inbox' ? 'current' : ''}`} 
          onClick={ () => handlePanels('inbox') }
        >
          <span className="wtd-dashboard-aside-menu__panel-icon"><i className="fas fa-inbox"></i></span>
          <span className="wtd-dashboard-aside-menu__panel-title">관리함</span> <small>{ totalCount }</small>
        </li>
        <li 
          className={`wtd-dashboard-aside-menu__panel ${togglePanelComponent === 'today' ? 'current' : ''}`} 
          onClick={ () => handlePanels('today') }
        >
          <span className="wtd-dashboard-aside-menu__panel-icon"><i className="far fa-calendar"></i></span>
          <span className="wtd-dashboard-aside-menu__panel-title">오늘</span> <small>{ todayCount }</small>
        </li>
        <li 
          className={`wtd-dashboard-aside-menu__panel ${togglePanelComponent === 'week' ? 'current' : ''}`} 
          onClick={ () => handlePanels('week') }
        >
          <span className="wtd-dashboard-aside-menu__panel-icon"><i className="fas fa-calendar-alt"></i></span>
          <span className="wtd-dashboard-aside-menu__panel-title">다음 7일</span> <small>{ weekCount }</small>
        </li>                
    </ul>
    <div className="wtd-dashboard-aside-menu__tabs project">
      <table>
        <tbody>
          <tr>
            <td className="wtd-dashboard-aside-menu__tab-control project">프로젝트</td>
            <td className="wtd-dashboard-aside-menu__tab-control filters">필터</td>
          </tr>
        </tbody>
      </table>
    </div>
  </aside>
)

export default DashboardAsideMenu;