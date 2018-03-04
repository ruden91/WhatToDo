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
      loading: true,
      toggleAddTodoItemButton: false,
      settings: null,
      messages: null
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
      if (currentUser) {
        // user defaultSettings
        database.ref('settings/' + currentUser.uid).on('value', (snap) => {
          this.setState({
            settings:snap.val()
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
          console.log(snap.val())
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
    const { todoItems, currentUser, loading, settings } = this.state;
    
    return (
      <div className="todo-app">
        {
          loading
          ?
          <MainLoading settings={ settings }/>
          :
          <Switch>
            <Route exact path="/" render={(props) => (
              currentUser ? <Redirect to="/main"/> : <Main />
            )} />
            <Route exact path="/main" render={(props) => (
              !currentUser ? <Main /> : <BoardMain { ...this.state } toggleAddTodoItem={ this.toggleAddTodoItem } />
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