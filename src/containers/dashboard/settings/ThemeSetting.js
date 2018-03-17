import React, { Component } from 'react';

import * as settings from 'api/settings';
import { auth, database } from 'database/firebase';

import { Scrollbars } from 'react-custom-scrollbars';

export default class ThemeSetting extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      themes: []
    }
  }

  componentWillMount () {
    let themes = settings.themes();
    const selectedThemeColor = this.props.settings.theme.color;
    console.log(selectedThemeColor)
    let refinedThemes = themes.map(theme => {
      if (theme.color === selectedThemeColor) {
        theme.active = true;
      }
      return theme;
    })

    this.setState({
      themes: refinedThemes
    })
  }

  handleThemeButton = (index) => {
    const { themes } = this.state;
    const uid = auth.currentUser.uid;
    const themeRef = database.ref('settings/' + uid).child('theme');

    let copiedThemes = themes.map((theme, themeIndex) => {
      if (themeIndex === index) {
        theme.active = true;
      } else {
        theme.active = false;
      }
      return theme;
    })
     
    themeRef.set({
      color: copiedThemes.filter(theme => theme.active)[0].color
    }).then(() => {
      this.setState({
        theme: copiedThemes
      })
    })
  }

  render() {
    const { themes } = this.state;
    const selectedThemeColor = themes.filter(theme => theme.active)[0].color;

    return (
      <div className="wtd-dashboard-theme-setting">
        <h6>테마</h6>
        <p>WhatToDo 개인화하기...</p>
        <div>
          <h6>색상 선택</h6>
          <Scrollbars style={{ width: 310, height: 500 }}>
            <ul>
              {themes.map((theme,index) => (
                <li key={index} className={theme.active ? 'is-active' : ''} onClick={ () => this.handleThemeButton(index) }>
                <span style={{ backgroundColor: theme.color }}></span>
                <span>{theme.name}</span>
                <i 
                  className="fas fa-check wtd-dashboard-theme-setting__check-icon"
                  style={{ color: theme.color }}
                ></i>
              </li>              
              ))}            
            </ul>
          </Scrollbars>
          <div className="wtd-dashboard-theme-setting__monitor-container">
            <header style={{ backgroundColor: selectedThemeColor }}>

            </header>

            <aside>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </aside>
            <div>
              <span className="line"></span>
              <span className="circle-and-line"></span>
              <span className="circle-and-line"></span>
              <span className="circle-and-line"></span>
              <span className="circle-and-line"></span>
              <span className="circle-and-line"></span>
              <span className="cross" style={{ color: selectedThemeColor }}>
                <i className="fas fa-plus"></i>
              </span>
            </div>
          </div>          
        </div>
      </div>
    )
  }
}