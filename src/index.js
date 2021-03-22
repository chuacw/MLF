import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
/*   Switch,
  Route
 */
} from "react-router-dom";
import { createHashHistory } from 'history';

ReactDOM.render(
  <Router history={createHashHistory()}>
  <React.StrictMode>
      <App />
  </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
