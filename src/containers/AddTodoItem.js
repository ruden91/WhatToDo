import React, { Component } from 'react';
import * as actions from '../actions';
import { database, auth, addTodoItem } from 'database/firebase';
import { random } from 'lodash';
import moment from 'moment';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default class AddTodoItem extends Component {
  constructor() {
    super();

    this.state = {
      content: "",
      openForm: false,
      selectedDay: null
    }
  }

  changeTodoItemContent = (e) => {
    this.setState({
      content: e.target.value
    })
  }
  
  createTodoItem = (e) => {
    e.preventDefault();
    const { content } = this.state;
    const uid = auth.currentUser.uid;

    if (content === '') {
      this.setState({
        openForm: false
      })
      return;
    }

    addTodoItem(uid, { content });

    // newTodoItemRef.set({
    //   title: this.state.content,
    //   active: false,
    //   // created_at: moment().add(random(0,30), 'days').toDate().getTime()
    //   created_at: new Date().getTime()
    // })

    this.setState({
      content: ""
    })
  }

  componentDidUpdate () {
    const { openForm } = this.state;
    if (typeof this.refs.addTodoItemInput !== 'undefined' && openForm) {
      this.refs.addTodoItemInput.focus();
    }

  }

  render() {
    const { openForm } = this.state;
    const { settings } = this.props;
    return (
      <div>
        {!openForm && <button 
          className="wtd-dashboard__add-todo-item"
          style={{ color: settings.theme.color}}
          onClick={() => this.setState({openForm: true})}>
          <span><i className="fas fa-plus"></i></span>작업 추가</button>}
        {openForm && <form className="wtd-dashboard__add-todo-item-form" onSubmit={ this.createTodoItem }>
          <div>
            <input 
              type="text" 
              onChange={ this.changeTodoItemContent }
              value={this.state.content}
              ref="addTodoItemInput"
            />
            <DayPickerInput onDayChange={day => this.setState({ selectedDay: day })} />
          </div>

          <button type="submit">작업 추가</button>
          <button onClick={() => this.setState({openForm: false})}>취소</button>
        </form>}
      </div>
    )
  }
}