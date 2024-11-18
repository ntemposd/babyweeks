import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Optional, if you have a CSS file for styles
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'; // Your main App component

// Render the App to the root div
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
