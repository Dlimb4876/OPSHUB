import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import './index.css';
import App from './App';

function Router() {
  return (
    <BrowserRouter basename="/OPSHUB">
      <RedirectHandler>
        <App />
      </RedirectHandler>
    </BrowserRouter>
  );
}

function RedirectHandler({ children }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirect');
    if (redirectPath) {
      sessionStorage.removeItem('redirect');
      // Remove the /OPSHUB prefix since basename handles it
      const path = redirectPath.replace('/OPSHUB', '') || '/';
      navigate(path);
    }
  }, [navigate]);

  return children;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
