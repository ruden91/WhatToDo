import React, { Component } from 'react';
import * as actions from '../actions';
import { database, auth, addTodoItem } from 'database/firebase';
import { random } from 'lodash';
import moment from 'moment';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import 'moment/locale/ko';

// Include the locale utils designed for moment
import MomentLocaleUtils from 'react-day-picker/moment';
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
    const receiveItem = {
      uid,
      content
    }

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
  CustomOverlay = ({ classNames, selectedDay, children }) => {
    return <div className={classNames.overlayWrapper}>
        <div className={classNames.overlay}>
          <header>
            <ul>
              <li>
                <span className="fa-layers fa-fw">
                  <i className="fas fa-circle-notch" />
                  <span className="fa-layers-text fa-inverse" data-fa-transform="shrink-8 down-3">
                    19
                  </span>
                </span>
              </li>
              <li>
                <span className="fa-layers fa-fw">
                  <i className="fas fa-calendar" />
                  <span className="fa-layers-text fa-inverse" data-fa-transform="shrink-8 down-3">
                    27
                  </span>
                </span>
              </li>
              <li>
                <i className="fas fa-long-arrow-alt-right" data-fa-transform="shrink-5 down-3" data-fa-mask="fas fa-calendar" />
              </li>
              <li>
                <i className="fas fa-sun" />
              </li>
              <li>
                <i className="fas fa-moon" />
              </li>
              <li>
                <i className="far fa-calendar-times" />
              </li>
            </ul>
          </header>
          {children}
        </div>
      </div>;
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
            <DayPickerInput
              overlayComponent={this.CustomOverlay} 
              dayPickerProps={{
                localeUtils: MomentLocaleUtils,
                locale: 'ko'
              }}            
              onDayChange={day => this.setState({ selectedDay: day })}
            />
          </div>

          <button type="submit">작업 추가</button>
          <button onClick={() => this.setState({openForm: false})}>취소</button>
        </form>}
      </div>
    )
  }
}