import * as React from 'react';
import { Link } from 'react-router-dom';

import './AppLogo.scss';
const AppLogo: React.SFC = () => (
  <div className="wtd-header__brand">
    <Link to="/" className="wtd-header__logo-holder">
      WhatToDo
    </Link>
  </div>
);

export default AppLogo;
