import * as React from 'react';
import { database, auth, saveUserData } from 'database/firebase';
import Main from 'components/router/Main';
import MainLoading from 'components/MainLoading';
import { withRouter } from 'react-router-dom';

import Alert from 'react-s-alert';

interface FirebaseUserData {
  uid: string;
}

interface RouteProps {
  history: {
    push: ((path: string) => void);
  };
  location: {
    pathname: string;
  };
}
interface AppProps {}

interface FirebaseTodoItemData {}

interface AppState {
  loading: Boolean;
  user: FirebaseUserData | null;
  items: {
    [key: string]: FirebaseTodoItemData;
  };
  initialItems: {
    [key: string]: FirebaseTodoItemData;
  };
}
class App extends React.Component<AppProps & RouteProps, AppState> {
  constructor(props: any) {
    super(props);
  }
  state = {
    loading: true,
    user: null,
    items: {},
    initialItems: {}
  };

  // 특정 기준으로 items 필터링
  public sortBySpecificFilter = (standard: string): void => {
    console.log(standard);
    if (standard === 'today') {
      this.setState({
        items: {
          askldfladsf: {
            content: '가즈아ㅏ아아아아'
          },
          askldfladsfbbbb: {
            content: '가즈아ㅏ아아아아2222'
          },
          askldfladsfaaaa: {
            content: '가즈아ㅏ아아아아22223333'
          }
        }
      });
    } else if (standard === 'days') {
      this.setState({
        items: {
          askldfladsf: {
            content: '가즈아ㅏ아아아아'
          },
          askldfladsfbbbb: {
            content: '가즈아ㅏ아아아아2222'
          },
          askldfladsfaaaa: {
            content: '가즈아ㅏ아아아아22223333'
          },
          askldfladsfccc: {
            content: '가즈아ㅏ아아아아'
          },
          askldfladsfbbbba: {
            content: '가즈아ㅏ아아아아2222'
          },
          askldfladsfaaada: {
            content: '가즈아ㅏ아아아아22223333'
          },
          askldflfdfadsf: {
            content: '가즈아ㅏ아아아아'
          },
          askldflasdfadsfbbbb: {
            content: '가즈아ㅏ아아아아2222'
          },
          askldflqweadsfaaaa: {
            content: '가즈아ㅏ아아아아22223333'
          }
        }
      });
    } else if (standard === 'inbox') {
      this.setState({
        items: this.state.initialItems
      });
    }
  };

  componentDidMount() {
    // const { user } = this.state;
    // 사용자 인증 체크
    auth.onAuthStateChanged((currentUser: FirebaseUserData | null): void => {
      if (currentUser) {
        console.log(currentUser);
        let { uid } = currentUser;
        this.props.history.push('/dashboard');
        // 로그인한 유저의 uid를 통해 데이터베이스에서 유저정보와 유저데이터 그리고 유저 세팅 정보를 state에 저장한다.
        database
          .ref('users')
          .child(uid)
          .on('value', (userSnap: any) => {
            if (!userSnap.val()) {
              saveUserData();
            } else {
              database
                .ref('items')
                .child(uid)
                .on('value', (itemSnap: any) => {
                  this.setState({
                    user: userSnap.val(),
                    initialItems: itemSnap.val(),
                    items: itemSnap.val(),
                    loading: false
                  });
                });
            }
          });
      } else {
        this.props.history.push('/');
      }
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="wtd">
        {loading ? (
          <MainLoading />
        ) : (
          <Main
            {...this.state}
            onSortBySpecificFilter={this.sortBySpecificFilter}
          />
        )}
        <Alert stack={{ limit: 3 }} />
      </div>
    );
  }
}

export default withRouter(App);
