import React, { Component } from 'react';
import { database, auth } from './firebase';

import './App.css';

import AppHeader from './AppHeader';
import TodoBoard from './TodoBoard';
import Main from './Main';
import BoardMain from './BoardMain';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainLoading from './MainLoading';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoItems: null,
      currentUser: null,
      loading: true
    }   
  }

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({
        currentUser,
        loading: false
      })
      if (currentUser) {
        database.ref('todoItems/' + this.state.currentUser.uid).on('value', (snap) => {
          this.setState({
            todoItems: snap.val()
          })
        })
      } else {
        this.setState({
          todoItems: null
        })        
      }  
    })
  }

  render() {
    const { todoItems, currentUser, loading } = this.state;
    
    return (
      <div className="todo-app">
        {
          loading
          ?
          <MainLoading />
          :
          <Switch>
            <Route exact path="/" render={(props) => (
              currentUser ? <Redirect to="/main"/> : <Main />
            )} />
            <Route path="/main" render={(props) => (
              !currentUser ? <Main /> : <BoardMain { ...this.state } />
            )} />
          </Switch>
        }
      <div>
      </div>
      </div>
    )
  }
}

export default App;