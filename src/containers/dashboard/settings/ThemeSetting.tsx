import * as React from "react";

import { themes } from "api/settings";

import Scrollbars from "react-custom-scrollbars";
import "./ThemeSetting.scss";
interface Props {}

interface State {}

export default class ThemeSetting extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      themes: themes
    };
  }

  // componentWillMount () {
  //   let themes = settings.themes();
  //   const selectedThemeColor = this.props.settings.theme.color;
  //   console.log(selectedThemeColor)
  //   let refinedThemes = themes.map(theme => {
  //     if (theme.color === selectedThemeColor) {
  //       theme.active = true;
  //     }
  //     return theme;
  //   })

  //   this.setState({
  //     themes: refinedThemes
  //   })
  // }

  // handleThemeButton = (index) => {
  //   const { themes } = this.state;
  //   const uid = auth.currentUser.uid;
  //   const themeRef = database.ref('settings/' + uid).child('theme');

  //   let copiedThemes = themes.map((theme, themeIndex) => {
  //     if (themeIndex === index) {
  //       theme.active = true;
  //     } else {
  //       theme.active = false;
  //     }
  //     return theme;
  //   })

  //   themeRef.set({
  //     color: copiedThemes.filter(theme => theme.active)[0].color
  //   }).then(() => {
  //     this.setState({
  //       theme: copiedThemes
  //     })
  //   })
  // }

  render() {
    return (
      <div className="wtd-dashboard-theme-setting">
        <h6>테마</h6>
        <p>WhatToDo 개인화하기...</p>
        <div>
          <h6>색상 선택</h6>
          <Scrollbars style={{ width: 310, height: 500 }}>
            <ul>
              {themes.map((theme, index) => (
                <li
                  key={index}
                  className={theme.active ? "is-active" : ""}
                  //   onClick={() => this.handleThemeButton(index)}
                >
                  <span style={{ backgroundColor: theme.color }} />
                  <span>{theme.name}</span>
                  <i
                    className="fas fa-check wtd-dashboard-theme-setting__check-icon"
                    style={{ color: theme.color }}
                  />
                </li>
              ))}
            </ul>
          </Scrollbars>
          <div className="wtd-dashboard-theme-setting__monitor-container">
            <header />

            <aside>
              <span className="line" />
              <span className="line" />
              <span className="line" />
              <span className="line" />
              <span className="line" />
              <span className="line" />
              <span className="line" />
              <span className="line" />
              <span className="line" />
              <span className="line" />
              <span className="line" />
              <span className="line" />
            </aside>
            <div>
              <span className="line" />
              <span className="circle-and-line" />
              <span className="circle-and-line" />
              <span className="circle-and-line" />
              <span className="circle-and-line" />
              <span className="circle-and-line" />
              <span className="cross">
                <i className="fas fa-plus" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
