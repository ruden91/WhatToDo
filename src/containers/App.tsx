import * as React from 'react';
import { auth } from 'database/firebase';
import Main from 'components/router/Main';
import MainLoading from 'components/MainLoading';
import { withRouter } from 'react-router-dom';

interface RouteProps {
  history: {
    push: ((path: string) => void);
  };
  location: {
    pathname: string;
  };
}
interface AppProps {}

interface AppState {
  loading: Boolean;
  user: any;
}
class App extends React.Component<AppProps & RouteProps, AppState> {
  constructor(props: any) {
    super(props);
  }
  state = {
    loading: true,
    user: null
  };

  componentDidMount() {
    // const { user } = this.state;

    // setTimeout(() => {
    //   if (!user) {
    //     this.props.history.push('/dashboard');

    //     this.setState({
    //       user: { uid: 'asdklfnkasdlflk' },
    //       loading: false
    //     });
    //   } else {
    //     this.props.history.push('/');

    //     this.setState({
    //       user: null,
    //       loading: false
    //     });
    //   }
    // }, 3500);
    // 사용자 인증 체크
    auth.onAuthStateChanged((currentUser: any): void => {
      console.log(currentUser);
      if (currentUser) {
        this.props.history.push('/dashboard');
      } else {
        console.log('아무일도 없었다');
      }

      this.setState({
        loading: false
      });
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div className="wtd">
        {loading ? <MainLoading /> : <Main user={user} />}
      </div>
    );
  }
}

export default withRouter(App);
// import {
//   auth,
//   GithubAuthProvider,
//   GoogleAuthProvider,
//   FacebookAuthProvider
// } from 'database/firebase';

// class App extends Component {
//   state = {
//     toggleSignupModal: false,
//     toggleLoginModal: false,
//     loading: true
//   };

//   componentDidMount() {
//     window.addEventListener('scroll', this.handleScroll);

//     auth.onAuthStateChanged(currentUser => {
//       if (currentUser) {
//         this.props.history.push('/dashboard');
//       } else {
//         this.setState({
//           loading: false
//         });
//       }
//     });
//   }

//   componentWillUnmount() {
//     window.removeEventListener('scroll', this.handleScroll);
//   }

//   render() {
//     const { toggleLoginModal, toggleSignupModal } = this.state;
//     const customStyles = {
//       overlay: { zIndex: 2, backgroundColor: 'rgba(102,102,102,0.5)' },
//       content: {
//         boxShadow: '0 0 2px 0 rgba(0,0,0,0.5), 0 0 10px 0 rgba(0,0,0,0.2)',
//         width: '420px',
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)'
//       }
//     };
//     return (
//       <div className="wtd">
//         {this.state.loading && <MainLoading />}
//         {!this.state.loading && (
//           <div>
//             <AppHeader
//               handleLoginButton={this.handleLoginButton}
//               handleSignUpButton={this.handleSignUpButton}
//             />
//             <IntroComponent handleSignUpButton={this.handleSignUpButton} />
//             <AppFooter />

//             <ReactModal
//               isOpen={toggleLoginModal}
//               onRequestClose={this.handleLoginModalClose}
//               ariaHideApp={false}
//               contentLabel="loginModal"
//               style={customStyles}
//               closeTimeoutMS={200}
//             >
//               <AppLoginForm
//                 handleLoginModalClose={this.handleLoginModalClose}
//                 handleProviderLogin={this.handleProviderLogin}
//               />
//             </ReactModal>

//             <ReactModal
//               isOpen={toggleSignupModal}
//               onRequestClose={this.handleSignUpModalClose}
//               ariaHideApp={false}
//               contentLabel="signupModal"
//               style={customStyles}
//               closeTimeoutMS={200}
//             >
//               <AppSignupForm
//                 handleSignUpModalClose={this.handleSignUpModalClose}
//                 handleProviderLogin={this.handleProviderLogin}
//               />
//             </ReactModal>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default withRouter(App);
// // import React, { Component } from 'react';
// // import { database, auth } from 'database/firebase';

// // import MainLoading from 'components/MainLoading';
// // import Dashboard from 'components/Dashboard';
// // import Main from 'containers/Main';
// // import { map, omit } from 'lodash';

// // import LoginForm from 'containers/LoginForm';
// // import Signup from 'containers/Signup';
// // import $ from 'jquery';
// // class App extends Component {
// //   constructor(props) {
// //     super(props);

// //     this.state = {
// //       todoItems: null,
// //       currentUser: null,
// //       loading: true,
// //       toggleAddTodoItemButton: false,
// //       settings: null,
// //       messages: null,
// //       verified: false
// //     }

// //     this.toggleAddTodoItem = this.toggleAddTodoItem.bind(this);
// //   }

// //   toggleAddTodoItem() {
// //     this.setState({
// //       toggleAddTodoItemButton: !this.state.toggleAddTodoItemButton
// //     })
// //   }

// //   componentDidMount() {
// //     // fetch userData and user todoItems
// //     auth.onAuthStateChanged(currentUser => {
// //       this.setState({
// //         currentUser,
// //         loading: true
// //       })
// //       if (currentUser) {
// //         // email 인증 유무 체크
// //         if (currentUser.emailVerified) {
// //           if (!currentUser.displayName) {
// //             currentUser.updateProfile({
// //               displayName: '흑미밥',
// //               photoURL: 'https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-1/c14.0.48.48/p48x48/10354686_10150004552801856_220367501106153455_n.jpg?oh=26830885109cf41da057908f11c5ec33&oe=5B0FF559'
// //             })
// //           }
// //           this.setState({
// //             verified: true
// //           })
// //         } else {
// //           alert('본인 확인을 위해 이메일 인증을 해주세요.');
// //           auth.signOut();
// //         }
// //         // // user defaultSettings
// //         database.ref('settings/' + currentUser.uid).on('value', (snap) => {
// //           if (snap.val()) {
// //             $('meta[name=theme-color]').attr('content', snap.val().backgroundColor);
// //           }
// //           this.setState({
// //             settings: snap.val()
// //           })
// //         })

// //         // messages data
// //         database.ref('messages').on('value', (snap) => {
// //           this.setState({
// //             messages: snap.val()
// //           })
// //         })

// //         // user todoItems
// //         database.ref('todoItems/' + currentUser.uid).on('value', (snap) => {
// //           this.setState({
// //             todoItems: this.sortTodoItems(snap.val()),
// //             loading: false
// //           })
// //         })
// //       } else {
// //         this.setState({
// //           todoItems: null,
// //           loading: false
// //         })
// //       }
// //     })
// //   }
// //   // 최신순으로 todoItems를 정렬해주는 함수
// //   sortTodoItems(items) {
// //     let results = {};
// //     let tempArray = map(items, (value, key) => ({ ...value, key })).reverse();

// //     map(tempArray, (value) => results[value.key] = omit(value, 'key'));

// //     return results;
// //   }
// //   render() {
// //     const { currentUser, loading, verified } = this.state;
// //     let template;

// //     if (currentUser) {
// //       if (verified) {
// //         // dashboard 컴포넌트
// //         template = <Dashboard { ...this.state } toggleAddTodoItem={ this.toggleAddTodoItem } />
// //       } else {
// //         // 이메일 인증 문구와 함께 첫화면 컴포넌트
// //         template = <LoginForm />
// //       }
// //     } else {
// //         // 첫화면 컴포넌트
// //         template = <LoginForm />
// //     }

// //     return (
// //       <div className="todo-app">
// //         {loading && <MainLoading />}
// //         {!loading && template }
// //       </div>
// //     )
// //   }
// // }

// // export default App;
