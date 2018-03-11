import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from 'database/firebase';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('유저 관련된 데이터 fetch')
  }
  componentDidMount() {
    console.log('componentDidMount');
  }

  handleLogOutButton = () => {
    auth.signOut();
  }

  componentWillMount() {
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {

      } else {
        this.props.history.push('/');
      }
    })
  }

  render() {
    return (
      <div className="wtd-dashboard">
        <button onClick={ this.handleLogOutButton }>로그아웃</button>
      </div>
    )
  }
}

export default withRouter(Dashboard);