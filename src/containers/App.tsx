import * as React from 'react';
import { fetchFirebaseUserData, auth } from 'database/firebase';
import Main from 'components/router/Main';
import MainLoading from 'components/MainLoading';
import { withRouter } from 'react-router-dom';

import Alert from 'react-s-alert';
import {
  calculateNotCompletedItemsCount,
  calculateItemsCount
} from 'helpers/module';
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
  inboxCount: number;
  todayCount: number;
  daysCount: number;
}
class App extends React.Component<AppProps & RouteProps, AppState> {
  constructor(props: any) {
    super(props);
  }
  state = {
    loading: true,
    user: null,
    items: {},
    initialItems: {},
    inboxCount: 0,
    todayCount: 0,
    daysCount: 0
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
        fetchFirebaseUserData(currentUser.uid).then((res: any) => {
          let userInfo = res[0];
          let userItems = res[1];
          // let userSettings = res[2];
          this.setState({
            user: userInfo,
            initialItems: userItems,
            items: userItems,
            loading: false,
            inboxCount: calculateNotCompletedItemsCount(userItems),
            todayCount: calculateItemsCount(userItems, 0),
            daysCount: calculateItemsCount(userItems, 7)
          });
        });

        this.props.history.push('/dashboard');
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
