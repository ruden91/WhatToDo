import React, { Component } from 'react';

import AppHeader from 'components/AppHeader';
import IntroComponent from 'components/IntroComponent';
import AppFooter from 'components/AppFooter';

import Modal from 'react-modal';
export default class App extends Component {
  state = {
    toggleModal: false
  }

  // 로그인 모달 제어 이벤트
  handleLoginButton = (e) => {
    e.preventDefault();
    console.log('handle login Button');
  }

  // 회원가입 모달 제어 이벤트
  handleSignUpButton = (e) => {
    e.preventDefault();
    
    this.setState({
      toggleModal: true
    })
  }

  // 회원가입 모달 닫기버튼 제어 함수
  handleSignUpModalClose = () => {
    this.setState({ toggleModal: false });
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

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const { toggleModal } = this.state;
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
        <AppHeader 
          handleLoginButton={ this.handleLoginButton }
          handleSignUpButton={ this.handleSignUpButton } 
        />
        <IntroComponent handleSignUpButton={ this.handleSignUpButton } />
        <AppFooter />

        <Modal
          isOpen={ toggleModal }
          onRequestClose={this.handleSignUpModalClose}
          ariaHideApp={ false }
          contentLabel="loginModal"
          style={ customStyles }
        >
          modal hello
          <button onClick={ this.handleSignUpModalClose }>close</button>
        </Modal>
      </div>
    )
  }
}
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