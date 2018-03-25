import * as React from 'react';

import { authEmailAndPassword } from 'database/firebase';

interface EmailLoginFormState {
  email: string;
  password: string;
}

export default class EmailLoginForm extends React.Component<
  {},
  EmailLoginFormState
> {
  state: EmailLoginFormState = {
    email: '',
    password: ''
  };

  handleEmailForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const { email, password } = this.state;
    authEmailAndPassword(email, password);
  };

  render() {
    return (
      <form
        className="wtd-signup-modal__signup-form"
        onSubmit={e => this.handleEmailForm(e)}
      >
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
        <input type="submit" value="로그인" />
      </form>
    );
  }
}
