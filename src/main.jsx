// Application entry point — mounts the React tree and loads Tailwind styles
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Render the root App component into the #root element
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
