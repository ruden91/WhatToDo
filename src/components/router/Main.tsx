import * as React from "react";
import { Switch, Route } from "react-router-dom";
import NoMatch from "components/lumber/NoMatch";
import Intro from "containers/Intro";
import Dashboard from "containers/Dashboard";

interface MainProps {
  user: any;
  filter: string;
  items: any[];
  projects: any[];
  inboxCount: number;
  todayCount: number;
  daysCount: number;
  completedCount: number;
  todayCompletedCount: number;
  changeFilter: (standard: string) => void;
  weeklyStats: any;
  moveTodoItem: (
    dragUniqKey: string,
    hoverUniqKey: string,
    targetPosition: string
  ) => void;
  postponeTodoItem: (item: any) => void;
}

const Main: React.SFC<MainProps> = AppProps => (
  <Switch>
    <Route exact={true} path="/" component={Intro} />
    <Route
      exact={true}
      path="/dashboard"
      render={props => <Dashboard {...props} {...AppProps} />}
    />
    <Route component={NoMatch} />
  </Switch>
);

export default Main;
