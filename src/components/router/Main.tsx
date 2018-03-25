import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import NoMatch from 'components/lumber/NoMatch';
import Intro from 'containers/Intro';
import Dashboard from 'containers/Dashboard';
// import AuthRoute from 'components/router/AuthRoute';
interface MainProps {
  user: object | null;
}

const Main: React.SFC<MainProps> = props => (
  <Switch>
    {/* <AuthRoute {...props} /> */}
    <Route exact={true} path="/" component={Intro} />
    <Route exact={true} path="/dashboard" component={Dashboard} />
    <Route component={NoMatch} />
  </Switch>
);

export default Main;
