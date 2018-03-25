import * as React from 'react';
import { authProvider } from 'database/firebase';
import EmailSignUpForm from 'components/auth/EmailSignUpForm';
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
        <button onClick={() => authProvider('google')}>
          구글 계정으로 가입
        </button>
        <button onClick={() => authProvider('facebook')}>
          페이스북 계정으로 가입
        </button>
        <button onClick={() => authProvider('github')}>
          깃허브 계정으로 가입
        </button>
      </div>
      <div className="wtd-signup-modal__separator">
        <span>또는</span>
      </div>
      <EmailSignUpForm />
    </div>
  </div>
);
export default AppSignupForm;
