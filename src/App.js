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

    database.ref('/todoItems').on('value', (snapshot) => {
      this.setState({
        todoItems: snapshot.val()
      })
    })   
  }

  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      this.setState({
        currentUser
      })
    })
  }

  render() {
    const { todoItems, currentUser } = this.state;
    return (
      <div className="todo-app">
      <AppHeader currentUser={ currentUser }/>
      <TodoBoard todoItems={ todoItems } />
      </div>
    )
  }
}

export default App;