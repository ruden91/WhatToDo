import React, { Component } from 'react';

import { auth } from 'database/firebase';

export default class UserSetting extends Component {
  constructor() {
    super();

    this.state = {
      updatedDisplayName: auth.currentUser.displayName,
      currentUser: auth.currentUser,
      toggleDisplayName: false
    }
  }

  updateUserProfile = () => {
    console.log('hello')
  }

  handleDisplayName = (e) => {
    e.preventDefault();
    this.setState({
      toggleDisplayName: true
    })
  }

  handleDisplayNameForm = (e) => {
    e.preventDefault();
    const { updatedDisplayName } = this.state;

    auth.currentUser.updateProfile({
      displayName: updatedDisplayName
    }).then(() => {
      // update successful
      this.setState({
        toggleDisplayName: false,
        currentUser: auth.currentUser
      })            
    }).catch(() => {
      // an error happend
      console.log('error')
    })    
  }

  render() {
    const { photoURL, email, displayName } = this.state.currentUser;
    const { updatedDisplayName } = this.state;
    return (
      <div className="wtd-dashboard-user-setting">
        <div>
          <p className="wtd-dashboard-user-setting__title">개인 정보</p>
          <dl onClick={this.updateUserProfile}>
            <dt>사진</dt>
            <dd>
              <span className="wtd-dashboard-user-setting__image-wrap">
                <span>
                  <i className="fas fa-camera-retro"></i>
                </span>
                <img src={ photoURL } alt={displayName} />
              </span>
            </dd>
          </dl>
          <dl>
            <dt>닉네임</dt>
            {!this.state.toggleDisplayName && <dd>{ displayName }<a href="#" onClick={ this.handleDisplayName }>편집</a></dd>}
            {this.state.toggleDisplayName && 
              <dd>
                <form onSubmit={ this.handleDisplayNameForm } >
                  <input type="text" value={ updatedDisplayName } onChange={ (e) => this.setState({ updatedDisplayName: e.target.value })} />
                  <button type="submit">저장</button>
                  <button onClick={ () => this.setState({ toggleDisplayName: false })}>취소</button>
                </form>
              </dd>
            }
          </dl>
          <dl>
            <dt>이메일</dt>
            <dd>{ email }</dd>
          </dl>
          <dl>
            <dt>패스워드</dt>
            <dd>******<a href="#">편집</a></dd>
          </dl>        
        </div>
        <div className="wtd-dashboard-user-setting__user-delete-info">
          <a href="#" className="wtd-dashboard-user-setting__user-delete-button">내 WhatToDo 계정 삭제</a>
          <p className="wtd-dashboard-user-setting__user-delete-comment">패스워드가 필요합니다</p> 
        </div>                        
      </div>
    )
  }
}