import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from 'database/firebase';

import DashboardHeader from 'components/dashboard/DashboardHeader';
import DashboardAsideMenu from 'components/dashboard/DashboardAsideMenu';
import DashboardScheduleManager from 'containers/dashboard/DashboardScheduleManager';

import { uniqueId } from 'lodash';

import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import update from 'react-addons-update';

import * as actions from '../actions';
import Store from '../store';

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
      dataSet: Store.getState()
    }
  }

  handlePanels = (panel) => {
    console.log(actions.fetchFilteredTodoItems({ filter: panel }));

    this.setState({
      togglePanelComponent: panel
    })    
  }

  updateState = () => {
    this.setState({ dataSet: Store.getState() });
  }

  componentDidMount() {
    Store.on('change', this.updateState);

    actions.fetchTodoItems();
  }

  componentWillUnmount() {
    Store.off('change', this.updateState);
  }

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
          </DashboardScheduleManager> 
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(Dashboard);