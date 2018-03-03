import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { database, auth } from 'database/firebase';

import MainLoading from 'components/MainLoading';
import BoardMain from 'components/BoardMain';
import Main from 'containers/Main';
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
    // fetch userData and user todoItems
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        database.ref('todoItems/' + currentUser.uid).on('value', (snap) => {
          this.setState({
            todoItems: snap.val(),
            loading: false,
            currentUser
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
            <Route exact path="/main" render={(props) => (
              !currentUser ? <Main /> : <BoardMain { ...this.state } />
            )} />
            <Route render={(props) => (
              currentUser ? <Redirect to="/main"/> : <Redirect to="/"/>
            )} />
          </Switch>
        }      
      </div>
    )
  }
}

export default App;