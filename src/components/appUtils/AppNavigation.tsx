import * as React from 'react';
import { Link } from 'react-router-dom';

import './AppNavigation.scss';
const AppNavigation: React.SFC = () => (
  <div className="wtd-header__actions-holder">
    <ul className="wtd-header__actions">
      <li className="wtd-header__action">
        <Link to="tour" className="wtd-header__action-link">
          설명
        </Link>
      </li>
      <li className="wtd-header__action">
        <a href="#" className="wtd-header__action-link">
          프리미엄
        </a>
      </li>
      <li className="wtd-header__action">
        <a href="#" className="wtd-header__action-link">
          비즈니스
        </a>
      </li>
      <li className="wtd-header__action">
        <a
          href="javascript:;"
          className="wtd-header__action-link"
          // onClick={handleLoginButton}
        >
          로그인
        </a>
      </li>
      <li className="wtd-header__action">
        <a
          href="javascript:;"
          className="wtd-header__action-link wtd-header__action-link--sign-up"
          // onClick={handleSignUpButton}
        >
          가입
        </a>
      </li>
    </ul>
  </div>
);

export default AppNavigation;
