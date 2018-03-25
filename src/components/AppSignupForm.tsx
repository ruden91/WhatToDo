import * as React from 'react';

interface AppSignUpFormProps {
  closeIntroModal: ((e: any) => void);
}

const AppSignupForm: React.SFC<AppSignUpFormProps> = props => (
  <div className="wtd-signup-modal__inner-container">
    <header className="wtd-signup-modal__header">
      <p>바로 가입</p>
      <span className="wtd-signup-modal__close-btn-wrap">
        <button onClick={props.closeIntroModal} />
      </span>
    </header>
    <div className="wtd-signup-modal__content">
      <div className="wtd-signup-modal__social-login">
        <button>구글 계정으로 가입</button>
        <button>페이스북 계정으로 가입</button>
        <button>깃허브 계정으로 가입</button>
      </div>
      <div className="wtd-signup-modal__separator">
        <span>또는</span>
      </div>
      <form className="wtd-signup-modal__signup-form">
        <label htmlFor="signup-modal-nickname">
          <i className="fas fa-user" />
          <input
            type="text"
            placeholder="당신의 닉네임"
            title="당신의 닉네임"
            id="signup-modal-nickname"
          />
        </label>
        <label htmlFor="signup-modal-email">
          <i className="far fa-envelope" />
          <input
            type="email"
            placeholder="이메일"
            title="이메일"
            id="signup-modal-email"
          />
        </label>
        <label htmlFor="signup-modal-password">
          <i className="fas fa-unlock" />
          <input
            type="password"
            placeholder="패스워드"
            title="패스워드"
            id="signup-modal-password"
          />
        </label>
        <input type="submit" value="내 계정 생성" />
      </form>
    </div>
  </div>
);
export default AppSignupForm;
