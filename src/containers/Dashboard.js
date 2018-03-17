import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth,database } from 'database/firebase';

import DashboardHeader from 'components/dashboard/DashboardHeader';
import DashboardAsideMenu from 'components/dashboard/DashboardAsideMenu';
import DashboardScheduleManager from 'containers/dashboard/DashboardScheduleManager';
import InboxContainer from 'containers/dashboard/InboxContainer';
import TodayContainer from 'containers/dashboard/TodayContainer';
import WeekContainer from 'containers/dashboard/WeekContainer';

import { uniqueId, filter } from 'lodash';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import update from 'react-addons-update';

import * as actions from '../actions';
import Store from '../store';

import { filterByDate } from 'helpers/filterByDate';
import moment from 'moment';

import MainLoading from 'components/MainLoading';
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      togglePanelComponent: 'today',
      todoItems: {},
      activedTodoItemsCount: 0,
      loading: true,
      settings: {
        theme: {
          color: null
        }
      }
    }
  }

  // side panel toggle event
  handlePanels = (panel) => {
    this.setState({
      togglePanelComponent: panel
    })    
  }
  // flux data update
  updateState = () => {
    this.setState({ ...Store.getState() });
  }

  // logout event
  handleLogOutButton = () => {
    auth.signOut();
  }

  // drag and drop event handler
  moveCard = (dragIndex, hoverIndex) => {
    const { todoItems } = this.state;
    const dragCard = todoItems[dragIndex];

    // react-addons-update legacy version -> immutability helper 전환하기
    this.setState(
      update(this.state, {
        todoItems: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  }

  componentWillMount() {
    // 사용자 인증 체크 (최적화하기)
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        // 사용자 todoItems 가져오기
        database.ref('todoItems/' + currentUser.uid).on('value', (snap) => {
          let currentTimeStamp = moment().add(0, 'days').toDate().getTime();
          let weekTimeStamp = moment().add(0, 'days').toDate().getTime();
          
          this.setState({
            todoItems: snap.val(),
            totalCount: snap.numChildren(),
            todayCount: filter(snap.val(), item => item.created_at <= currentTimeStamp).length,
            weekCount: filter(snap.val(), item => item.created_at <= weekTimeStamp).length,
            activedTodoItemsCount: filter(snap.val(), item => item.active).length,
            loading: false
          })
        })

        database.ref('settings/' + currentUser.uid).on('value', (snap) => {
          if (!snap.val()) {
            database.ref('settings/' + currentUser.uid).child('theme').set({ color: '#db4c3f' });
          }

          this.setState({
            settings: snap.val() || { theme: { color: '#db4c3f' }}
          })
        })
      } else {
        this.props.history.push('/');
      }
    })
  }

  // 조건부로 컴포넌트를 생성하기 위한 함수
  // 전체 리스트를 보여줄 컴포넌트
  // 오늘 리스트를 보여줄 컴포넌트
  // 일주일 리스트를 보여줄 컴포넌트
  renderConditionalComponent() {
    const { togglePanelComponent, todoItems, settings } = this.state;
          let currentTimeStamp = moment().add(0, 'days').toDate().getTime();
          let weekTimeStamp = moment().add(7, 'days').toDate().getTime();    
    if (togglePanelComponent === 'inbox') {
      // 전체 todoItems
      return <InboxContainer todoItems={ todoItems } settings={ settings } />
    } else if (togglePanelComponent === 'today') {
      // 지난값, 오늘에 해당하는 todoItems
      
      return <TodayContainer todoItems={ todoItems } settings={ settings } />
    } else if (togglePanelComponent === 'week') {
      // 지난값, 현재 기준으로 일주일 todoItems
      return <WeekContainer todoItems={ todoItems } settings={ settings } />
    }
  }

  render() {
    const { 
      togglePanelComponent, 
      panels, 
      todayCount, 
      totalCount, 
      weekCount, 
      activedTodoItemsCount,
      todoItems,
      settings,
      loading} = this.state;
    
    return (
      <div className="wtd-dashboard">
        {loading && <div className="wtd-dashboard__loading-container"><MainLoading /></div>}
        <DashboardHeader 
          activedTodoItemsCount={ activedTodoItemsCount } 
          todoItems={ todoItems }
          settings={ settings } 
        />
        <div className="wtd-container">
          <DashboardAsideMenu 
            handlePanels={ this.handlePanels } 
            togglePanelComponent={ togglePanelComponent }
            todayCount={todayCount}
            totalCount={totalCount}
            weekCount={weekCount}
          />
          <DashboardScheduleManager>
            { this.renderConditionalComponent() }
          </DashboardScheduleManager> 
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Dashboard);