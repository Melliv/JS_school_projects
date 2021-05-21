import 'jquery';
import 'popper.js';
import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import './assets/sb-admin-2.min.css';
//import './assets/all.min.css';
import './assets/site.css';

// import reportWebVitals from './reportWebVitals';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Router>
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
