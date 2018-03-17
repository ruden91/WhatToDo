import React from 'react';
import { Link } from 'react-router-dom';

import SettingButton from 'containers/dashboard/SettingButton';
import Productivity from 'containers/dashboard/Productivity';
const DashboardHeader = ({ activedTodoItemsCount, todoItems }) => (
  <header className="wtd-dashboard-header">
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
            <Productivity activedTodoItemsCount={ activedTodoItemsCount } todoItems={ todoItems } />
          </li>      
          <li className="wtd-dashboard-header__actions">
            <button className="wtd-dashboard-header__action"><i className="fas fa-bell"></i></button>
          </li>      
          <li className="wtd-dashboard-header__actions">
            <SettingButton />
          </li>        
        </ul>
      </div>    
    </div>
  </header>
)

export default DashboardHeader;