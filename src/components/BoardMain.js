import React, { Component } from 'react';

import AppHeader from 'components/AppHeader';
import TodoBoard from 'containers/TodoBoard';
import { elastic as Menu } from 'react-burger-menu';

import UserInfo from 'containers/UserInfo';
import ChatButton from 'containers/ChatButton';

export default class BoardMain extends Component {
  render() {
    const { todoItems, currentUser, toggleAddTodoItem, toggleAddTodoItemButton, settings } = this.props;  
    const styles = {
      bmMenu: {
        backgroundColor: this.props.settings ? this.props.settings.backgroundColor : ''
      },
      bmMorphShape: {
        fill: this.props.settings ? this.props.settings.backgroundColor : ''
      }
    }
    return (
      <div id="outer-container"> 
        <Menu 
          pageWrapId={ "page-wrap" } 
          outerContainerId={ "outer-container" } 
          width={ 280 } 
          styles={styles}
        >
          { currentUser && <UserInfo currentUser={ currentUser } settings={ settings }/> }
        </Menu>
        <div id="page-wrap">
          <AppHeader 
            toggleAddTodoItem={ toggleAddTodoItem } 
            toggleAddTodoItemButton={toggleAddTodoItemButton}
            settings={ settings } 
          />
          <div className="todo-app__content">
            <TodoBoard 
              todoItems={ todoItems } 
              currentUser={ currentUser } 
              toggleAddTodoItemButton={ toggleAddTodoItemButton } 
              toggleAddTodoItem={ toggleAddTodoItem }
              settings= { settings }
            />
            <ChatButton />
          </div>          
        </div>
      </div>
    )
  }
}