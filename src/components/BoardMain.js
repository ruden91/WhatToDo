import React, { Component } from 'react';

import AppHeader from 'components/AppHeader';
import TodoBoard from 'containers/TodoBoard';
import { elastic as Menu } from 'react-burger-menu';

import UserInfo from 'components/UserInfo';
export default class BoardMain extends Component {
  render() {
    const { todoItems, currentUser } = this.props;  
    return (
      <div id="outer-container"> 
        <Menu 
          pageWrapId={ "page-wrap" } 
          outerContainerId={ "outer-container" } 
          width={ 240 } 
          disableOverlayClick 
        >
          { currentUser && <UserInfo currentUser={ currentUser } /> }
        </Menu>
        <div id="page-wrap">
          <AppHeader currentUser={ currentUser }/>
          <div className="todo-app__content">
            { <TodoBoard todoItems={ todoItems } currentUser={ currentUser } /> }
          </div>          
        </div>
      </div>
    )
  }
}