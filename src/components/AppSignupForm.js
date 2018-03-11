import React from 'react';

const AppSignupForm = ({ handleSignUpModalClose, handleProviderLogin }) => (
  <div className="wtd-signup-modal__inner-container">
    <header className="wtd-signup-modal__header">
      <p>바로 가입</p>
      <span className="wtd-signup-modal__close-btn-wrap">
        <button onClick={ handleSignUpModalClose }>
        </button>              
      </span>
    </header>
    <div className="wtd-signup-modal__content">
      <div className="wtd-signup-modal__social-login">
        <button onClick={ () => handleProviderLogin('GoogleAuthProvider') }>구글 계정으로 가입</button>
        <button onClick={ () => handleProviderLogin('FacebookAuthProvider') }>페이스북 계정으로 가입</button>
        <button onClick={ () => handleProviderLogin('GithubAuthProvider') }>깃허브 계정으로 가입</button>                
      </div>
      <div className="wtd-signup-modal__separator">
        <span>또는</span>
      </div>
      <form className="wtd-signup-modal__signup-form">
        <label htmlFor="signup-modal-nickname">
          <i className="fas fa-user"></i>
          <input 
            type="text" 
            placeholder="당신의 닉네임" 
            title="당신의 닉네임" 
            id="signup-modal-nickname"
            maxLength="10"
          />
        </label>
        <label htmlFor="signup-modal-email">
          <i className="far fa-envelope"></i>
          <input type="email" placeholder="이메일" title="이메일" id="signup-modal-email" maxLength="30"/>
        </label>
        <label htmlFor="signup-modal-password">
          <i className="fas fa-unlock"></i>
          <input type="password" placeholder="패스워드" title="패스워드" id="signup-modal-password" />
        </label>
        <input type="submit" value="내 계정 생성" />
      </form>
    </div>          
  </div>
)

export default AppSignupForm;