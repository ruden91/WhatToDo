import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from 'database/firebase';

import DashboardHeader from 'components/dashboard/DashboardHeader';
import DashboardAsideMenu from 'components/dashboard/DashboardAsideMenu';
import DashboardScheduleManager from 'containers/dashboard/DashboardScheduleManager';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('유저 관련된 데이터 fetch')
  }
  componentDidMount() {
    console.log('componentDidMount');
  }

  handleLogOutButton = () => {
    auth.signOut();
  }

  componentWillMount() {
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {

      } else {
        this.props.history.push('/');
      }
    })
  }

  render() {
    return (
      <div className="wtd-dashboard">
        <DashboardHeader />
        <div className="wtd-container">
          <DashboardAsideMenu />
          <DashboardScheduleManager />          
        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard);