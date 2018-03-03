import React, { Component } from 'react';

import AppHeader from 'components/AppHeader';
import TodoBoard from 'containers/TodoBoard';

export default class BoardMain extends Component {
  render() {
    const { todoItems, currentUser } = this.props;  
    return (
      <div> 
        <AppHeader currentUser={ currentUser }/>
        <div className="todo-app__content">
          { <TodoBoard todoItems={ todoItems } currentUser={ currentUser } /> }
        </div>
      </div>
    )
  }
}