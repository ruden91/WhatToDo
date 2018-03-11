import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from 'database/firebase';

import DashboardHeader from 'components/dashboard/DashboardHeader';
import DashboardAsideMenu from 'components/dashboard/DashboardAsideMenu';
import DashboardScheduleManager from 'containers/dashboard/DashboardScheduleManager';

import InboxPanel from 'components/dashboard/InboxPanel';
import TodayPanel from 'components/dashboard/TodayPanel';
import NextWeekPanel from 'components/dashboard/NextWeekPanel';

import { uniqueId } from 'lodash';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      togglePanelComponent: 'today',
      panels: [
        {
          title: '관리함',
          icon: 'fas fa-inbox',
          component: 'inbox',
          key: uniqueId()
        },
        {
          title: '오늘',
          icon: 'far fa-calendar',
          component: 'today',
          key: uniqueId()
        },
        {
          title: '다음 7일',
          icon: 'fas fa-calendar-alt',
          component: 'week',
          key: uniqueId()
        }               
      ]
    }
  }

  handlePanels = (panel) => {
    this.setState({
      togglePanelComponent: panel
    })    
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

  renderConditionalComponent() {
    const { togglePanelComponent } = this.state;

    if (togglePanelComponent === 'inbox') {
      return <InboxPanel />
    } else if (togglePanelComponent === 'today') {
      return <TodayPanel />
    } else if (togglePanelComponent === 'week') {
      return <NextWeekPanel />
    }
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
    const { togglePanelComponent, panels } = this.state;
    return (
      <div className="wtd-dashboard">
        <DashboardHeader />
        <div className="wtd-container">
          <DashboardAsideMenu panels={ panels } handlePanels={ this.handlePanels } togglePanelComponent={ togglePanelComponent }/>
          <DashboardScheduleManager> 
            { this.renderConditionalComponent() }
          </DashboardScheduleManager> 
        </div>
      </div>
    )
  }
}

export default withRouter(Dashboard);