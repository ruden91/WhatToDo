import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import App from './App';
import firebase from 'firebase';
import DB_CONFIG from './config';

firebase.initializeApp(DB_CONFIG);

ReactDOM.render(<App />, document.getElementById('root'));