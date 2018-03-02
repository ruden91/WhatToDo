import React, { Component } from 'react';
import { database, auth, GithubAuthProvider } from './firebase';

import './App.css';

import AppHeader from './AppHeader';
import TodoBoard from './TodoBoard';
import Main from './Main';
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
      <div>
        {!currentUser && <Main />}
        {currentUser 
          &&
          <div> 
            <AppHeader currentUser={ currentUser }/>
            <div className="todo-app__content">
              <TodoBoard todoItems={ todoItems } currentUser={ currentUser } /> 
            </div>
          </div>
        }
      </div>
      </div>
    )
  }
}

export default App;