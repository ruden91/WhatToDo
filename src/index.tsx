import * as React from 'react';
import * as ReactDOM from 'react-dom';

// dependencies
import { BrowserRouter } from 'react-router-dom';

// components
// import NoMatch from 'components/lumber/NoMatch';

import App from 'containers/App';

// styles
import 'normalize.css';
import 'styles/index.scss';
// optional - you can choose the effect you want
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#root')
);
