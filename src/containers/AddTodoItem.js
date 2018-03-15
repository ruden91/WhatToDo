import React, { Component } from 'react';
import * as actions from '../actions';
export default class AddTodoItem extends Component {
  constructor() {
    super();
  }

  createTodoItem = () => {
    actions.createTodoItems();
  }

  render() {
    return (
      <div>
        <button onClick={ this.createTodoItem }>create todoItem</button>
      </div>
    )
  }
}