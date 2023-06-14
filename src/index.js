import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './containers/App';
import { PostsContextProvider } from './context/PostsContext';
import './styles/index.scss';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PostsContextProvider>
      <Router>
        <App />
      </Router>
    </PostsContextProvider>
  </React.StrictMode>
);
