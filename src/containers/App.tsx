import * as React from 'react';
import Main from 'components/router/Main';
import MainLoading from 'components/MainLoading';
import { withRouter } from 'react-router-dom';
import { database, auth } from 'database/firebase';
import Alert from 'react-s-alert';
import {
  calculateNotCompletedItemsCount,
  calculateCompletedItemsCount,
  calculateItemsCount,
  calculateDailyCompletedItems,
  makeWeeklyStats,
  filterItemsBySpecificStandard
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
  items: {};
  // items: {
  //   [key: string]: FirebaseTodoItemData | {};
  // };
  initialItems: {
    [key: string]: FirebaseTodoItemData;
  };
  inboxCount: number;
  todayCount: number;
  daysCount: number;
  completedCount: number;
  todayCompletedCount: number;
  weeklyStats: any;
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
    daysCount: 0,
    completedCount: 0,
    todayCompletedCount: 0,
    weeklyStats: []
  };

  // 특정 기준으로 items 필터링
  public sortBySpecificFilter = (standard: string): void => {
    let result = filterItemsBySpecificStandard(
      this.state.initialItems,
      standard
    );
    this.setState({
      items: result
    });
  };

  componentDidMount() {
    // const { user } = this.state;
    // 사용자 인증 체크
    auth.onAuthStateChanged((currentUser: FirebaseUserData | null): void => {
      if (currentUser) {
        let userRef = database.ref('users').child(currentUser.uid);
        let itemRef = database.ref('items').child(currentUser.uid);

        userRef.on('value', (snap: any) => {
          this.setState({
            user: snap.val()
          });
        });

        itemRef.on('value', (snap: any) => {
          this.setState({
            initialItems: snap.val(),
            items: snap.val(),
            inboxCount: calculateNotCompletedItemsCount(snap.val()),
            todayCount: calculateItemsCount(snap.val(), 0),
            daysCount: calculateItemsCount(snap.val(), 7),
            completedCount: calculateCompletedItemsCount(snap.val()),
            todayCompletedCount: calculateDailyCompletedItems(snap.val(), 0),
            weeklyStats: makeWeeklyStats(snap.val()),
            loading: false
          });
        });

        this.props.history.push('/dashboard');
      } else {
        this.props.history.push('/');
        this.setState({
          loading: false
        });
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
