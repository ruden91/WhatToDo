import React, { Component } from 'react';
import { database, auth } from 'database/firebase';
import AppHeader from 'components/AppHeader';
// import TodoBoard from './TodoBoard';
// import Main from './Main';
// import BoardMain from './BoardMain';
// import { Switch, Route, Redirect } from 'react-router-dom';
// import MainLoading from './MainLoading';
class App extends Component {
  constructor(props) {
    super(props);
    console.log(database)
    this.state = {
      todoItems: null,
      currentUser: null,
      loading: true
    }   
  }
  render() {
    return (
      <div>
        app
      </div>
    )
  }
  // componentDidMount() {
  //   auth.onAuthStateChanged(currentUser => {
  //     this.setState({
  //       currentUser
  //     })
  //     if (currentUser) {
  //       database.ref('todoItems/' + this.state.currentUser.uid).on('value', (snap) => {
  //         this.setState({
  //           todoItems: snap.val(),
  //           loading: false
  //         })
  //       })
  //     } else {
  //       this.setState({
  //         todoItems: null,
  //         loading: false
  //       })        
  //     }  
  //   })
  // }

  // render() {
  //   const { todoItems, currentUser, loading } = this.state;
    
  //   return (
  //     <div className="todo-app">
  //       {
  //         loading
  //         ?
  //         <MainLoading />
  //         :
  //         <Switch>
  //           <Route exact path="/" render={(props) => (
  //             currentUser ? <Redirect to="/main"/> : <Main />
  //           )} />
  //           <Route path="/main" render={(props) => (
  //             !currentUser ? <Main /> : <BoardMain { ...this.state } />
  //           )} />
  //         </Switch>
  //       }
  //     <div>
  //     </div>
  //     </div>
  //   )
  // }
}

export default App;