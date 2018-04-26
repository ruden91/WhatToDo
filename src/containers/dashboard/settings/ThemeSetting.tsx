import * as React from "react";

import { themes } from "api/settings";
import { updateTheme } from "database/firebase";
import Scrollbars from "react-custom-scrollbars";
import "./ThemeSetting.scss";
interface Props {
  settings: any;
}

interface State {
  themes: any[];
}

export default class ThemeSetting extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  state: State = {
    themes
  };

  handleThemeButton = (theme: any): void => {
    updateTheme(theme);
  };

  render() {
    const { theme } = this.props.settings;
    console.log(theme);
    return (
      <div className="wtd-dashboard-theme-setting">
        <h6>테마</h6>
        <p>WhatToDo 개인화하기...</p>
        <div>
          <h6>색상 선택</h6>
          <Scrollbars style={{ width: 310, height: 500 }}>
            <ul>
              {themes.map((themeItem, index) => (
                <li
                  key={index}
                  className={themeItem.color === theme.color ? "is-active" : ""}
                  onClick={() => this.handleThemeButton(themeItem)}
                >
                  <span style={{ backgroundColor: themeItem.color }} />
                  <span>{themeItem.name}</span>
                  <i
                    className="fas fa-check wtd-dashboard-theme-setting__check-icon"
                    style={{ color: themeItem.color }}
                  />
                </li>
              ))}
            </ul>
          </Scrollbars>
          <div className="wtd-dashboard-theme-setting__monitor-container">
            <header style={{ backgroundColor: theme.color }} />

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
              <span className="cross" style={{ color: theme.color }}>
                <i className="fas fa-plus" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
