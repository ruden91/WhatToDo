import * as React from 'react';
import * as ReactDOM from 'react-dom';

// dependencies
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import NoMatch from 'components/lumber/NoMatch';

import App from 'containers/App';
import Dashboard from 'containers/Dashboard';

// styles
import 'normalize.css';
import 'styles/index.scss';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/" component={App} />
      <Route exact={true} path="/dashboard" component={Dashboard} />
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>,
  document.querySelector('#root')
);
