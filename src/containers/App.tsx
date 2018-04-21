import * as React from "react";
import Main from "components/router/Main";
import MainLoading from "components/MainLoading";
import { withRouter } from "react-router-dom";
import * as ReactDnd from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { database, auth, postponeTodoItemData } from "database/firebase";
import Alert from "react-s-alert";
import {
  calculateNotCompletedItemsCount,
  calculateCompletedItemsCount,
  calculateItemsCount,
  calculateDailyCompletedItems,
  makeWeeklyStats,
  filterItemsBySpecificStandard
} from "helpers/module";

import * as moment from "moment";
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
  user: any;
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
  filter: string;
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
    weeklyStats: [],
    filter: "today"
  };

  public changeFilter = (standard: string) => {
    const { initialItems } = this.state;

    this.setState({
      items: filterItemsBySpecificStandard(initialItems, standard),
      filter: standard
    });
  };

  public postponeTodoItem = (item: any): void => {
    let due = moment(this.state.items[item.uid].due)
      .add("days", 1)
      .format("YYYY-MM-DD");

    postponeTodoItemData(item.uid, due);
  };

  public moveTodoItem = (dragUniqKey: string, hoverUniqKey: string): void => {
    console.log(dragUniqKey);
    console.log(hoverUniqKey);
  };

  componentDidMount() {
    // const { user } = this.state;
    // 사용자 인증 체크
    auth.onAuthStateChanged((currentUser: FirebaseUserData | null): void => {
      if (currentUser) {
        let userRef = database.ref("users").child(currentUser.uid);
        let itemRef = database.ref("items").child(currentUser.uid);

        userRef.on("value", (snap: any) => {
          console.log(snap.val());
          this.setState({
            user: { ...snap.val(), daily_goal: 10 }
          });
        });

        itemRef.on("value", (snap: any) => {
          const { filter } = this.state;
          this.setState({
            initialItems: snap.val(),
            items: filterItemsBySpecificStandard(snap.val(), filter),
            inboxCount: calculateNotCompletedItemsCount(snap.val()),
            todayCount: calculateItemsCount(snap.val(), 0),
            daysCount: calculateItemsCount(snap.val(), 7),
            completedCount: calculateCompletedItemsCount(snap.val()),
            todayCompletedCount: calculateDailyCompletedItems(snap.val()),
            weeklyStats: makeWeeklyStats(snap.val()),
            loading: false
          });
        });
        this.props.history.push("/dashboard");
      } else {
        this.props.history.push("/");
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
            changeFilter={this.changeFilter}
            moveTodoItem={this.moveTodoItem}
            postponeTodoItem={this.postponeTodoItem}
          />
        )}
        <Alert stack={{ limit: 3 }} />
      </div>
    );
  }
}
export default withRouter(ReactDnd.DragDropContext(HTML5Backend)(App));
