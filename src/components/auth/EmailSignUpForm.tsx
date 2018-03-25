import * as React from 'react';
import { createUserWithEmail } from 'database/firebase';

interface EmailSignUpFormState {
  email: string;
  password: string;
}

export default class EmailSignUpForm extends React.Component<
  {},
  EmailSignUpFormState
> {
  state: EmailSignUpFormState = {
    email: '',
    password: ''
  };

  handleEmailForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email);
    console.log(password);
    createUserWithEmail(email, password);
  };

  render() {
    return (
      <form
        className="wtd-signup-modal__signup-form"
        onSubmit={e => this.handleEmailForm(e)}
      >
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
            onChange={e => this.setState({ email: e.target.value })}
          />
        </label>
        <label htmlFor="signup-modal-password">
          <i className="fas fa-unlock" />
          <input
            type="password"
            placeholder="패스워드"
            title="패스워드"
            id="signup-modal-password"
            onChange={e => this.setState({ password: e.target.value })}
          />
        </label>
        <input type="submit" value="내 계정 생성" />
      </form>
    );
  }
}
