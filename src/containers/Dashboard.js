import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from 'database/firebase';

import DashboardHeader from 'components/dashboard/DashboardHeader';
import DashboardAsideMenu from 'components/dashboard/DashboardAsideMenu';
import DashboardScheduleManager from 'containers/dashboard/DashboardScheduleManager';

import InboxPanel from 'components/dashboard/InboxPanel';
import TodayPanel from 'components/dashboard/TodayPanel.jsx';
import NextWeekPanel from 'components/dashboard/NextWeekPanel';

import { uniqueId } from 'lodash';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import update from 'react-addons-update';

<<<<<<< HEAD
import moment from 'moment';
=======
>>>>>>> f8c4cee5a5ceba7477a019e0d3af04e4e4b47b30
// todo items sample data
import * as data from 'api/data';
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
      ],
      todoItems: data.todoItems()
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

<<<<<<< HEAD
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
=======
  moveCard = (dragIndex, hoverIndex) => {
    const { todoItems } = this.state;
    const dragCard = todoItems[dragIndex];

    this.setState(
      update(this.state, {
        todoItems: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  }

  renderConditionalComponent() {
    const { togglePanelComponent, todoItems } = this.state;
>>>>>>> f8c4cee5a5ceba7477a019e0d3af04e4e4b47b30

  moveCard = (dragIndex, hoverIndex) => {
    const { todoItems } = this.state;
    const dragCard = todoItems[dragIndex];

    this.setState(
      update(this.state, {
        todoItems: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        },
      }),
    )
  }

  renderConditionalComponent() {
    const { togglePanelComponent, todoItems } = this.state;
    if (togglePanelComponent === 'inbox') {
<<<<<<< HEAD
      const refinedTodoItems = todoItems.filter((item, index) => !item.active );
      // 전체
      return <InboxPanel todoItems={ refinedTodoItems } moveCard={ this.moveCard } activeTodoItem={this.activeTodoItem}/>
    } else if (togglePanelComponent === 'today') {
      // 오늘 날짜, 지난 날짜 데이터
      const refinedTodoItems = todoItems.filter((item, index) => item.created_at <= moment().add(0, 'days').format('YYYY-MM-DD') && !item.active );

      return <TodayPanel todoItems={ refinedTodoItems } moveCard={ this.moveCard } activeTodoItem={this.activeTodoItem} />
    } else if (togglePanelComponent === 'week') {
      // 지난 날짜, 현재 기준으로 일주일 데이터
      const refinedTodoItems = todoItems.filter((item, index) => item.created_at <= moment().add(7, 'days').format('YYYY-MM-DD') && !item.active);

      return <NextWeekPanel todoItems={ refinedTodoItems } moveCard={ this.moveCard } activeTodoItem={this.activeTodoItem} />
=======
      return <InboxPanel todoItems={ todoItems } moveCard={ this.moveCard } />
    } else if (togglePanelComponent === 'today') {
      return <TodayPanel todoItems={ todoItems } moveCard={ this.moveCard } />
    } else if (togglePanelComponent === 'week') {
      return <NextWeekPanel todoItems={ todoItems } moveCard={ this.moveCard } />
>>>>>>> f8c4cee5a5ceba7477a019e0d3af04e4e4b47b30
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

export default DragDropContext(HTML5Backend)(Dashboard);