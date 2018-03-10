import React from 'react';

const BrandIntro = ({ handleSignUpButton }) => (
  <div className="wtd-brand-intro">
    <p>WhatToDo와 함께 일정관리를 시작하세요</p>
    <a href="#" onClick={ handleSignUpButton }>시작하세요 - 무료입니다</a>
  </div>
)

export default BrandIntro;