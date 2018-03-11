import React from 'react';
import { Link } from 'react-router-dom';
const DashboardHeader = () => (
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
            <button className="wtd-dashboard-header__action">
              <i className="far fa-check-circle"></i>
              <span>300</span>
            </button>
          </li>      
          <li className="wtd-dashboard-header__actions">
            <button className="wtd-dashboard-header__action"><i className="fas fa-bell"></i></button>
          </li>      
          <li className="wtd-dashboard-header__actions">
            <button className="wtd-dashboard-header__action wtd-dashboard-header__action--setting">
              <i className="fas fa-cog"></i>
            </button>
          </li>        
        </ul>
      </div>    
    </div>
  </header>
)

export default DashboardHeader;