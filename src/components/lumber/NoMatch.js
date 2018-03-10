import React from 'react';

import { Link } from 'react-router-dom';
const NoMatch = () => (
  <div className="wtd-no-match">
    <p className="wtd-no-match__logo">
      <Link to="/">WhatToDo LOGO</Link>
    </p>
    <h3><b>404</b> Sorry, the page you're looking for isn’t here anymore</h3>
    <p className="wtd-no-match__support">
      If you reached this page from another part of <Link to="/">WhatToDo App</Link>, 
      please <Link to="support">let us know</Link> so we can correct our mistake.
    </p>
  </div>
)

export default NoMatch;