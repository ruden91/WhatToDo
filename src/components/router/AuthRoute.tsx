import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
// import Intro from 'containers/Intro';
import Dashboard from 'containers/Dashboard';
interface AuthRouteProps {
  user?: {};
}
const AuthRoute: React.SFC<AuthRouteProps> = ({ ...props }: any) => {
  // 유저 데이터가 있으면 dashboard component로 이동, 없으면 intro component
  const { user } = props;
  console.log(user);
  return user ? (
    <Route
      exact={true}
      path="/dashboard"
      render={props => <Dashboard {...props} />}
    />
  ) : (
    <Redirect to="/" />
  );
};

export default AuthRoute;
