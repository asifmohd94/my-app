import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '../node_modules/antd/dist/reset.css'
import { Provider } from 'react-redux';
import appStore from './store/appStore'



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={appStore}>
    <App />
    </Provider>
  </React.StrictMode>
);


