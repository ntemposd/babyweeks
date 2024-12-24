import React from 'react';
import ReactDOM from 'react-dom/client'; // Use ReactDOM from 'react-dom/client' for React 18
import './index.css'; // Optional, if you have a CSS file for styles
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App'; // Your main App component

// React 18 rendering using createRoot
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
