import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./route"; 
import { AppContextProvider } from './context/AppContext'; // Import the AppContextProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
    <AppContextProvider> {/* Wrap the Router with AppContextProvider */}
      <Routes />
    </AppContextProvider>
    </Router>

  </React.StrictMode>
);

reportWebVitals();
