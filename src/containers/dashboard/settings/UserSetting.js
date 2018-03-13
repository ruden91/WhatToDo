import React, { Component } from 'react';

import { auth } from 'database/firebase';

export default class UserSetting extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: auth.currentUser
    }
  }

  updateUserProfile = () => {
    console.log('hello')
  }

  render() {
    const { photoURL, email, displayName } = this.state.currentUser;

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
            <dd>{ displayName }<a href="#">편집</a></dd>
          </dl>
          <dl>
            <dt>이메일</dt>
            <dd>{ email }<a href="#">편집</a></dd>
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