import React from 'react';
import ReactDOM from 'react-dom/client';

// Bootstrap CSS — must be imported before App
import 'bootstrap/dist/css/bootstrap.min.css';

// Our global styles
import './App.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
