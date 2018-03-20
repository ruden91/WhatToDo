import React from 'react';
import { Link } from 'react-router-dom';

import SettingButton from 'containers/dashboard/SettingButton';
import Productivity from 'containers/dashboard/Productivity';
const DashboardHeader = ({ completedCount, todoItems, settings }) => (
  <header className="wtd-dashboard-header" style={{ backgroundColor: settings.theme.color }}>
    <div className="wtd-container">
      <div className="wtd-dashboard-header__inner">
        <div className="wtd-dashboard-header__logo-holder">
          <Link to="dashboard" className="wtd-dashboard-header__logo">WhatToDo</Link>
        </div>
        <ul className="wtd-dashboard-header__actions-holder">
          <li className="wtd-dashboard-header__actions">
            <button className="wtd-dashboard-header__action wtd-dashboard-header__action--add">
            </button>
          </li>      
          <li className="wtd-dashboard-header__actions">
            <Productivity completedCount={ completedCount } todoItems={ todoItems } />
          </li>      
          <li className="wtd-dashboard-header__actions">
            <button className="wtd-dashboard-header__action"><i className="fas fa-bell"></i></button>
          </li>      
          <li className="wtd-dashboard-header__actions">
            <SettingButton settings={ settings } />
          </li>        
        </ul>
      </div>    
    </div>
  </header>
)

export default DashboardHeader;