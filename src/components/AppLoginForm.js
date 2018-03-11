import React from 'react';

const AppLoginForm = ({ handleLoginModalClose, handleProviderLogin }) => (
  <div className="wtd-signup-modal__inner-container">
    <header className="wtd-signup-modal__header">
      <p>로그인</p>
      <span className="wtd-signup-modal__close-btn-wrap">
        <button onClick={ handleLoginModalClose }>
        </button>              
      </span>
    </header>
    <div className="wtd-signup-modal__content">
      <div className="wtd-signup-modal__social-login">
        <button onClick={ () => handleProviderLogin('GoogleAuthProvider') }>구글 계정으로 로그인</button>
        <button onClick={ () => handleProviderLogin('FacebookAuthProvider') }>페이스북 계정으로 로그인</button>
        <button onClick={ () => handleProviderLogin('GithubAuthProvider') }>깃허브 계정으로 로그인</button>                
      </div>
      <div className="wtd-signup-modal__separator">
        <span>또는</span>
      </div>
      <form className="wtd-signup-modal__signup-form">
        <label htmlFor="signup-modal-email">
          <i className="far fa-envelope"></i>
          <input type="email" placeholder="이메일" title="이메일" id="signup-modal-email" maxLength="30"/>
        </label>
        <label htmlFor="signup-modal-password">
          <i className="fas fa-unlock"></i>
          <input type="password" placeholder="패스워드" title="패스워드" id="signup-modal-password" />
        </label>
        <input type="submit" value="로그인" />
      </form>
      <div className="wtd-login-modal__help-block">
        <p><a href="#">패스워드를 잊어버렸습니까?</a></p>
        <p>추가 도움이 필요합니까? <a href="#">WhatToDo 지원 연락</a></p>
        <p>계정이 없습니까? <a href="#">바로 가입</a></p>                  
      </div>
    </div>          
  </div>
)

export default AppLoginForm;