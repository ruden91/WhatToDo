import React, { Component } from 'react';

const AppFooter = () => (
  <footer className="wtd-footer">
    <div className="wtd-container">
      <div className="wtd-footer__site-nav-container">
        <nav className="wtd-footer__site-nav">
          <h2>언어</h2>
        </nav>
        <nav className="wtd-footer__site-nav">
          <h2>WhatToDo 소개</h2>
        </nav>
        <nav className="wtd-footer__site-nav">
          <h2>리소스</h2>
        </nav>
        <nav className="wtd-footer__site-nav">
          <h2>법률 관련</h2>
        </nav>        
        <nav className="wtd-footer__site-nav">
          <h2>개발자 정보</h2>
        </nav>
        <nav className="wtd-footer__site-nav">
          <h2>다른 서비스</h2>
        </nav>                                
      </div>
      <div className="wtd-footer__separator">
      </div>
      <div className="wtd-footer__bottom-content">
        <h2 className="wtd-footer__copyright">Copyright (C) 2018 Ruden All Right Reserved</h2>
      </div>
    </div>
  </footer>
)

export default AppFooter;