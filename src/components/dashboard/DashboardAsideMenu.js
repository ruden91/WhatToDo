import React from 'react';

const DashboardAsideMenu = ({ togglePanelComponent, panels, handlePanels }) => (
  <aside className="wtd-dashboard-aside-menu">
    <ul className="wtd-dashboard-aside-menu__panels">
      {panels.map(panel => (
        <li 
          className={`wtd-dashboard-aside-menu__panel ${togglePanelComponent === panel.component ? 'current' : ''}`} 
          key={panel.key} 
          onClick={ () => handlePanels(panel.component) }
        >
          <span className="wtd-dashboard-aside-menu__panel-icon"><i className={panel.icon}></i></span>
          <span className="wtd-dashboard-aside-menu__panel-title">{panel.title}</span> <small>3</small>
        </li>
      ))}
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