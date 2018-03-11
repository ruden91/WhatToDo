import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import AppHeader from 'components/AppHeader';
import IntroComponent from 'components/IntroComponent';
import AppFooter from 'components/AppFooter';
import AppLoginForm from 'components/AppLoginForm';
import AppSignupForm from 'components/AppSignupForm';
import MainLoading from 'components/MainLoading';

import ReactModal from 'react-modal';
import { auth, GithubAuthProvider, GoogleAuthProvider, FacebookAuthProvider } from 'database/firebase';
import * as actions from '../actions';
import Store from '../store';

class App extends Component {
  state = {
    toggleSignupModal: false,
    toggleLoginModal: false,
    loading: true,
    data: Store.getState()
  }

  // 로그인 모달 제어 이벤트
  handleLoginButton = (e) => {
    e.preventDefault();
    this.setState({ toggleLoginModal: true });
  }

  // 로그인 모달 닫기버튼 제어 함수
  handleLoginModalClose = () => {
    this.setState({ toggleLoginModal: false });
  }

  // 회원가입 모달 제어 이벤트
  handleSignUpButton = (e) => {
    e.preventDefault();
    
    this.setState({
      toggleSignupModal: true
    })
  }

  // 회원가입 모달 닫기버튼 제어 함수
  handleSignUpModalClose = () => {
    this.setState({ toggleSignupModal: false });
  }

  handleProviderLogin = (provider) => {
    let providerName;
    if (provider === 'GoogleAuthProvider') {
      providerName = GoogleAuthProvider;
    } else if (provider === 'FacebookAuthProvider') {
      providerName = FacebookAuthProvider;
    } else if (provider === 'GithubAuthProvider') {
      providerName = GithubAuthProvider;
    }

    auth.signInWithPopup(providerName).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      let token = result.credential.accessToken;
      // The signed-in user info.
      let user = result.user;

      actions.fetchCurrentUser(user);      
    }).catch((error) => {
      console.log('인증실패');
      console.log(error)
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      let credential = error.credential;
      // ...
    })
  }

  handleScroll = (e) => {
    let scrollTop = e.srcElement.all[0].scrollTop;
    let headerElement = document.querySelector('.wtd-header');
    
    if (scrollTop > 20) {
      headerElement.classList.add('wtd-header--is-detached');
    } else {
      headerElement.classList.remove('wtd-header--is-detached');
    }
  }

  updateState = () => {
    this.setState(Store.getState());
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    Store.on('change', this.updateState);

    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {

        this.props.history.push('/dashboard');
      } else {
        this.setState({
          loading: false
        })
      }
    })    
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    console.log(Store)
    // Store.off('change', this.updateState);
  }

  render() {
    const { toggleLoginModal, toggleSignupModal } = this.state;
    const customStyles = {
      overlay: {zIndex: 2, backgroundColor: 'rgba(102,102,102,0.5)'},
      content: {
        boxShadow: '0 0 2px 0 rgba(0,0,0,0.5), 0 0 10px 0 rgba(0,0,0,0.2)',
        width: '420px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'        
      }
    };    
    return (
      <div className="wtd">
        {this.state.loading && <MainLoading />}
        {!this.state.loading && <div><AppHeader 
          handleLoginButton={ this.handleLoginButton }
          handleSignUpButton={ this.handleSignUpButton } 
        />
        <IntroComponent handleSignUpButton={ this.handleSignUpButton } />
        <AppFooter />

        <ReactModal
          isOpen={ toggleLoginModal }
          onRequestClose={this.handleLoginModalClose}
          ariaHideApp={ false }
          contentLabel="loginModal"
          style={ customStyles }
          closeTimeoutMS={200}
        >
          <AppLoginForm 
            handleLoginModalClose={ this.handleLoginModalClose } 
            handleProviderLogin={ this.handleProviderLogin }
          />
        </ReactModal>

        <ReactModal
          isOpen={ toggleSignupModal }
          onRequestClose={this.handleSignUpModalClose}
          ariaHideApp={ false }
          contentLabel="signupModal"
          style={ customStyles }
          closeTimeoutMS={200}
        >
          <AppSignupForm 
            handleSignUpModalClose={ this.handleSignUpModalClose } 
            handleProviderLogin={ this.handleProviderLogin }
          />
        </ReactModal></div>}
      </div>
    )
  }
}

export default withRouter(App);
// import React, { Component } from 'react';
// import { database, auth } from 'database/firebase';

// import MainLoading from 'components/MainLoading';
// import Dashboard from 'components/Dashboard';
// import Main from 'containers/Main';
// import { map, omit } from 'lodash';

// import LoginForm from 'containers/LoginForm';
// import Signup from 'containers/Signup';
// import $ from 'jquery';
// class App extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       todoItems: null,
//       currentUser: null,
//       loading: true,
//       toggleAddTodoItemButton: false,
//       settings: null,
//       messages: null,
//       verified: false
//     }   

//     this.toggleAddTodoItem = this.toggleAddTodoItem.bind(this);
//   }

//   toggleAddTodoItem() {
//     this.setState({
//       toggleAddTodoItemButton: !this.state.toggleAddTodoItemButton
//     })
//   }

//   componentDidMount() {
//     // fetch userData and user todoItems
//     auth.onAuthStateChanged(currentUser => {
//       this.setState({
//         currentUser,
//         loading: true
//       })
//       if (currentUser) {
//         // email 인증 유무 체크
//         if (currentUser.emailVerified) {
//           if (!currentUser.displayName) {
//             currentUser.updateProfile({
//               displayName: '흑미밥',
//               photoURL: 'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-1/c14.0.48.48/p48x48/10354686_10150004552801856_220367501106153455_n.jpg?oh=26830885109cf41da057908f11c5ec33&oe=5B0FF559'
//             })
//           }
//           this.setState({
//             verified: true
//           })
//         } else {
//           alert('본인 확인을 위해 이메일 인증을 해주세요.');
//           auth.signOut();
//         }
//         // // user defaultSettings
//         database.ref('settings/' + currentUser.uid).on('value', (snap) => {
//           if (snap.val()) {
//             $('meta[name=theme-color]').attr('content', snap.val().backgroundColor);
//           }
//           this.setState({
//             settings: snap.val()
//           })
//         })

//         // messages data
//         database.ref('messages').on('value', (snap) => {
//           this.setState({
//             messages: snap.val()
//           })          
//         })

//         // user todoItems
//         database.ref('todoItems/' + currentUser.uid).on('value', (snap) => {
//           this.setState({
//             todoItems: this.sortTodoItems(snap.val()),
//             loading: false
//           })
//         })
//       } else {
//         this.setState({
//           todoItems: null,
//           loading: false
//         })        
//       }  
//     })
//   }
//   // 최신순으로 todoItems를 정렬해주는 함수
//   sortTodoItems(items) {
//     let results = {};
//     let tempArray = map(items, (value, key) => ({ ...value, key })).reverse();

//     map(tempArray, (value) => results[value.key] = omit(value, 'key'));

//     return results;
//   }
//   render() {
//     const { currentUser, loading, verified } = this.state;
//     let template;

//     if (currentUser) {
//       if (verified) {
//         // dashboard 컴포넌트
//         template = <Dashboard { ...this.state } toggleAddTodoItem={ this.toggleAddTodoItem } />
//       } else {
//         // 이메일 인증 문구와 함께 첫화면 컴포넌트
//         template = <LoginForm />
//       }
//     } else {
//         // 첫화면 컴포넌트
//         template = <LoginForm />
//     }

//     return (
//       <div className="todo-app">
//         {loading && <MainLoading />}
//         {!loading && template }
//       </div>
//     )
//   }
// }

// export default App;