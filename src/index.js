// Importing React library to create components
import React from 'react';

// Importing ReactDOM library to render the React components to the DOM
import ReactDOM from 'react-dom/client';

// Importing the main App component
import App from './App';

// Importing the CSS file for global styles
import './index.css';

// Creating a root element to render the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component within a StrictMode wrapper to help identify potential problems in an application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
