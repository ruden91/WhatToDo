import * as React from 'react';
import { authProvider } from 'database/firebase';
import './AppLoginForm.scss';

import EmailLoginForm from 'components/auth/EmailLoginForm';
import AnonymousLogin from 'components/auth/AnonymousLogin';
interface AppLoginFormProps {
  closeIntroModal: ((e: any) => void);
  openIntroModal: ((e: React.MouseEvent<HTMLElement>, target: string) => void);
}

const AppLoginForm: React.SFC<AppLoginFormProps> = props => (
  <div className="wtd-signup-modal__inner-container">
    <header className="wtd-signup-modal__header">
      <p>로그인</p>
      <span className="wtd-signup-modal__close-btn-wrap">
        <button onClick={props.closeIntroModal} />
      </span>
    </header>
    <div className="wtd-signup-modal__content">
      <div className="wtd-signup-modal__social-login">
        <button onClick={() => authProvider('google')}>
          구글 계정으로 로그인
        </button>
        <button onClick={() => authProvider('facebook')}>
          페이스북 계정으로 로그인
        </button>
        <button onClick={() => authProvider('github')}>
          깃허브 계정으로 로그인
        </button>
      </div>
      <div className="wtd-signup-modal__separator">
        <span>또는</span>
      </div>
      <EmailLoginForm />
      <AnonymousLogin />
      <div className="wtd-login-modal__help-block">
        <p>
          <a href="#">패스워드를 잊어버렸습니까?</a>
        </p>
        <p>
          추가 도움이 필요합니까? <a href="#">WhatToDo 지원 연락</a>
        </p>
        <p>
          계정이 없습니까?{' '}
          <a href="#" onClick={e => props.openIntroModal(e, 'signUp')}>
            바로 가입
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default AppLoginForm;
