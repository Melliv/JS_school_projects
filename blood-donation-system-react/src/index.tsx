import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";

import 'jquery';
import 'popper.js';
import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
//import 'font-awesome/css/font-awesome.min.css';

import './assets/sb-admin-2.min.css';
//import './assets/all.min.css';
import './assets/site.css';

ReactDOM.render(
    <Router basename={process.env.PUBLIC_URL}>
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    </Router>,
    document.getElementById('root')
);
