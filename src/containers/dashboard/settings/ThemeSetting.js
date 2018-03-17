import React, { Component } from 'react';

import * as settings from 'api/settings';
import { auth, database } from 'database/firebase';

export default class ThemeSetting extends Component {
  constructor() {
    super();
    
    this.state = {
      themes: []
    }
  }

  componentWillMount () {
    let themes = settings.themes();
    const testColor = '#db4c3f';

    let refinedThemes = themes.map(theme => {
      if (theme.color === testColor) {
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
    let copiedThemes = themes.map((theme, themeIndex) => {
      if (themeIndex === index) {
        theme.active = true;
      } else {
        theme.active = false;
      }
      return theme;
    })
    
    console.log('firebase theme setting 변경')
    this.setState({
      theme: copiedThemes
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