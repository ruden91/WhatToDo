import React, { Component } from 'react';
import { database, auth, GithubAuthProvider } from './firebase';

import './App.css';

import AppHeader from './AppHeader';
import TodoBoard from './TodoBoard';
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoItems: null,
      currentUser: null
    }   
  }

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({
        currentUser
      })

      if (currentUser) {
        database.ref('todoItems/' + this.state.currentUser.uid).on('value', (snap) => {
          this.setState({
            todoItems: snap.val()
          })
        })
      } else {
        console.log(this.state.currentUser);
      }  
    })
  }

  render() {
    const { todoItems, currentUser } = this.state;

    return (
      <div className="todo-app">
      <AppHeader currentUser={ currentUser }/>
      {!currentUser && 'user data 없다' }
      {currentUser && <TodoBoard todoItems={ todoItems } currentUser={ currentUser } /> }
      </div>
    )
  }
}

export default App;