import React, { Component } from 'react';
import { database, auth } from 'database/firebase';

import MainLoading from 'components/MainLoading';
import Dashboard from 'components/Dashboard';
import Main from 'containers/Main';
import { map, omit } from 'lodash';

import LoginForm from 'containers/LoginForm';
import Signup from 'containers/Signup';
import $ from 'jquery';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoItems: null,
      currentUser: null,
      loading: true,
      toggleAddTodoItemButton: false,
      settings: null,
      messages: null,
      verified: false
    }   

    this.toggleAddTodoItem = this.toggleAddTodoItem.bind(this);
  }

  toggleAddTodoItem() {
    
    this.setState({
      toggleAddTodoItemButton: !this.state.toggleAddTodoItemButton
    })
  }

  componentDidMount() {
    // fetch userData and user todoItems
    auth.onAuthStateChanged(currentUser => {
      this.setState({
        currentUser
      })
      console.log('auth check')      
      if (currentUser) {
        // email 인증 유무 체크
        if (currentUser.emailVerified) {
          this.setState({
            verified: true
          })
        } else {
          this.setState({
            verified: false
          })
        }
        // // user defaultSettings
        database.ref('settings/' + currentUser.uid).on('value', (snap) => {
          if (snap.val()) {
            $('meta[name=theme-color]').attr('content', snap.val().backgroundColor);
          }
          this.setState({
            settings: snap.val()
          })
        })

        // messages data
        database.ref('messages').on('value', (snap) => {
          this.setState({
            messages: snap.val()
          })          
        })

        // user todoItems
        database.ref('todoItems/' + currentUser.uid).on('value', (snap) => {
          this.setState({
            todoItems: this.sortTodoItems(snap.val()),
            loading: false
          })
        })
      } else {
        this.setState({
          todoItems: null,
          loading: false
        })        
      }  
    })
  }
  // 최신순으로 todoItems를 정렬해주는 함수
  sortTodoItems(items) {
    let results = {};
    let tempArray = map(items, (value, key) => {
      return {
        ...value,
        key
      }
    }).reverse();

    map(tempArray, (value) => {
      results[value.key] = omit(value, 'key');
    })

    return results;
  }
  render() {
    const { todoItems, settings, currentUser, loading, verified } = this.state;
    let template;

    if (currentUser) {
      if (verified) {
        // dashboard 컴포넌트
        template = <Dashboard { ...this.state } toggleAddTodoItem={ this.toggleAddTodoItem } />
      } else {
        // 이메일 인증 문구와 함께 첫화면 컴포넌트
        template = <LoginForm />
      }
    } else {
        // 첫화면 컴포넌트
        template = <LoginForm />
    }

    return (
      <div className="todo-app">
        {loading && <MainLoading />}
        {!loading && template }
      </div>
    )
  }
}

export default App;