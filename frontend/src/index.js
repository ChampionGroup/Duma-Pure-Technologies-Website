import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./route"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
