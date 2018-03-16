import React, { Component } from 'react';
import * as actions from '../actions';
import { database, auth } from 'database/firebase';
import { random } from 'lodash';
import moment from 'moment';
export default class AddTodoItem extends Component {
  constructor() {
    super();
  }

  createTodoItem = () => {
    const uid = auth.currentUser.uid;
    let newTodoItemRef = database.ref('todoItems/' + uid).push();

    newTodoItemRef.set({
      title: 'hello',
      active: false,
      created_at: moment().add(random(0,30), 'days').toDate().getTime()
      // created_at: new Date().getTime()
    })
  }

  render() {
    return (
      <div>
        <button onClick={ this.createTodoItem }>create todoItem</button>
      </div>
    )
  }
}