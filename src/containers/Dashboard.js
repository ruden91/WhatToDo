import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from 'database/firebase';

import DashboardHeader from 'components/dashboard/DashboardHeader';
import DashboardAsideMenu from 'components/dashboard/DashboardAsideMenu';
import DashboardScheduleManager from 'containers/dashboard/DashboardScheduleManager';
import InboxContainer from 'containers/dashboard/InboxContainer';
import TodayContainer from 'containers/dashboard/TodayContainer';
import WeekContainer from 'containers/dashboard/WeekContainer';

import { uniqueId } from 'lodash';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import update from 'react-addons-update';

import * as actions from '../actions';
import Store from '../store';

import { filterByDate } from 'helpers/filterByDate';
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      togglePanelComponent: 'today'
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

  componentDidMount() {
    Store.on('change', this.updateState);

    // fetch todoItems
    actions.fetchTodoItems();
  }

  componentWillUnmount() {
    Store.off('change', this.updateState);
  }

  // logout event
  handleLogOutButton = () => {
    auth.signOut();
  }

  activeTodoItem = (id) => {
    const { todoItems } = this.state;
    
    const refinedTodoItems = todoItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          active: true
        }
      }
        return item;
    })

    this.setState({
      todoItems: refinedTodoItems
    })
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
    const { togglePanelComponent, todoItems } = this.state;
    if (togglePanelComponent === 'inbox') {
      // 전체 todoItems
      return <InboxContainer todoItems={ todoItems } />
    } else if (togglePanelComponent === 'today') {
      // 지난값, 오늘에 해당하는 todoItems
      
      return <TodayContainer todoItems={ filterByDate(todoItems, 'today') } />
    } else if (togglePanelComponent === 'week') {
      // 지난값, 현재 기준으로 일주일 todoItems
      return <WeekContainer todoItems={ filterByDate(todoItems, 'week') } />
    }
  }

  render() {
    const { togglePanelComponent, panels, todayCount, totalCount, weekCount } = this.state;
    
    return (
      <div className="wtd-dashboard">
        <DashboardHeader />
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