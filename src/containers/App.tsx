import * as React from "react";
import Main from "components/router/Main";
import MainLoading from "components/MainLoading";
import { withRouter } from "react-router-dom";
import * as ReactDnd from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import {
  database,
  auth,
  postponeTodoItemData,
  initProjectItems
} from "database/firebase";

import Alert from "react-s-alert";
import {
  calculateNotCompletedItemsCount,
  calculateCompletedItemsCount,
  calculateItemsCount,
  calculateDailyCompletedItems,
  makeWeeklyStats,
  filterItemsBySpecificStandard,
  filterNotCompletedItem
} from "helpers/module";
import { find, remove, findIndex } from "lodash";
// import { filter, findIndex, map, find, merge } from "lodash";
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

// interface FirebaseTodoItemData {}

interface AppState {
  loading: Boolean;
  user: any;
  items: any[];
  initialItems: any[];
  projects: any[];
  inboxCount: number;
  todayCount: number;
  daysCount: number;
  completedCount: number;
  todayCompletedCount: number;
  weeklyStats: any;
  filter: string;
  projectIndex?: number;
}
class App extends React.Component<AppProps & RouteProps, AppState> {
  constructor(props: any) {
    super(props);
  }
  state: AppState = {
    projects: [],
    loading: true,
    user: null,
    items: [],
    initialItems: [],
    inboxCount: 0,
    todayCount: 0,
    daysCount: 0,
    completedCount: 0,
    todayCompletedCount: 0,
    weeklyStats: [],
    filter: "today",
    projectIndex: undefined
  };

  public changeFilter = (standard: string, index?: number) => {
    const { initialItems } = this.state;
    let filter = standard;
    if (filter === "project") {
      if (typeof index !== "undefined") {
        filter = this.state.projects[index].name;
      }
    }

    this.setState({
      items: filterItemsBySpecificStandard(initialItems, standard, index),
      filter,
      projectIndex: index
    });
  };

  public postponeTodoItem = (data: any): void => {
    let item: any = find(this.state.items, { uniqueKey: data.uid });
    let due = moment(item.due)
      .add("days", 1)
      .format("YYYY-MM-DD");
    postponeTodoItemData(item.uniqueKey, due);
  };

  public moveTodoItem = (
    dragUniqKey: string,
    hoverUniqKey: string,
    targetPosition: string
  ): void => {
    let testItems: any[] = this.state.items.map(item => item);

    let movedItem = find(testItems, { uniqueKey: dragUniqKey }) || {};
    let targetItem: any = find(testItems, { uniqueKey: hoverUniqKey });

    movedItem["due"] = targetItem["due"];
    remove(testItems, (item: any) => {
      return item.uniqueKey === dragUniqKey;
    });
    // movedItem.due = targetDate;

    if (targetPosition === "up") {
      let index = findIndex(testItems, (item: any) => {
        return item.uniqueKey === targetItem.uniqueKey;
      });

      testItems.splice(index, 0, movedItem);
    } else if (targetPosition === "down") {
      let index = findIndex(testItems, (item: any) => {
        return item.uniqueKey === targetItem.uniqueKey;
      });

      testItems.splice(index + 1, 0, movedItem);
    }

    this.setState({
      items: testItems
    });
  };

  componentDidMount() {
    // const { user } = this.state;
    // 사용자 인증 체크
    auth.onAuthStateChanged((currentUser: FirebaseUserData | null): void => {
      if (currentUser) {
        let userRef = database.ref("users").child(currentUser.uid);
        let itemRef = database.ref("items").child(currentUser.uid);
        let projectRef = database.ref("projects").child(currentUser.uid);
        let projects: any[] = [];
        userRef.on("value", (snap: any) => {
          this.setState({
            user: { ...snap.val(), daily_goal: 10 }
          });
        });

        projectRef.on("value", (snap: any) => {
          if (!snap.val()) {
            initProjectItems();
          } else {
            projects = snap.val();
          }
        });

        itemRef.on("value", (snap: any) => {
          const { filter, projectIndex } = this.state;
          // transform object to array
          let initialItems = snap.val();
          let refinedItems: any[] = [];

          for (let key in initialItems) {
            let index = Object.keys(initialItems).indexOf(key);

            refinedItems.push({
              ...initialItems[key],
              index,
              uniqueKey: key
            });
          }

          projects = projects.map(project => {
            return {
              ...project,
              count: filterNotCompletedItem(refinedItems).filter(item => {
                return item.project_index === project.filterIndex;
              }).length
            };
          });

          this.setState({
            initialItems: refinedItems,
            items: filterItemsBySpecificStandard(
              refinedItems,
              filter,
              projectIndex
            ),
            inboxCount: calculateNotCompletedItemsCount(refinedItems),
            todayCount: calculateItemsCount(refinedItems, 0),
            daysCount: calculateItemsCount(refinedItems, 7),
            completedCount: calculateCompletedItemsCount(refinedItems),
            todayCompletedCount: calculateDailyCompletedItems(refinedItems),
            weeklyStats: makeWeeklyStats(refinedItems),
            loading: false,
            projects
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
