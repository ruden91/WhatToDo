import React, { Component } from 'react';

import AppHeader from 'components/AppHeader';
import TodoBoard from 'containers/TodoBoard';
import { elastic as Menu } from 'react-burger-menu';

import UserInfo from 'components/UserInfo';
import ChatButton from 'containers/ChatButton';

export default class BoardMain extends Component {
  render() {
    const { todoItems, currentUser, toggleAddTodoItem, toggleAddTodoItemButton, headerTitle } = this.props;  
    return (
      <div id="outer-container"> 
        <Menu 
          pageWrapId={ "page-wrap" } 
          outerContainerId={ "outer-container" } 
          width={ 280 } 
        >
          { currentUser && <UserInfo currentUser={ currentUser } /> }
        </Menu>
        <div id="page-wrap">
          <AppHeader toggleAddTodoItem={ toggleAddTodoItem } toggleAddTodoItemButton={toggleAddTodoItemButton} />
          <div className="todo-app__content">
            <TodoBoard 
              todoItems={ todoItems } 
              currentUser={ currentUser } 
              toggleAddTodoItemButton={ toggleAddTodoItemButton } 
              toggleAddTodoItem={ toggleAddTodoItem }
            />
            <ChatButton />
          </div>          
        </div>
      </div>
    )
  }
}