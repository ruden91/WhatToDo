import * as React from 'react';
import { signOut } from 'database/firebase';

import './Settings.scss';
const Settings: React.SFC = () => (
  <table className="wtd-dashboard-header__setting-panels">
    <tbody>
      <tr>
        <td>설정</td>
      </tr>
      <tr>
        <td className="separator">
          <div />
        </td>
      </tr>
      <tr>
        <td>Donate</td>
      </tr>
      <tr>
        <td>
          <a href="http://webruden.tistory.com/">블로그</a>
        </td>
      </tr>
      <tr>
        <td className="separator">
          <div />
        </td>
      </tr>
      <tr>
        <td>
          <button onClick={signOut}>로그아웃</button>
        </td>
      </tr>
      <tr>
        <td className="separator">
          <div />
        </td>
      </tr>
      <tr>
        <td>
          <span>
            버전 1.2.2.{' '}
            <a
              href="https://github.com/ruden91/react-firebase-project/commits/master"
              target="_blank"
            >
              체인지로그 보기
            </a>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
);

export default Settings;
