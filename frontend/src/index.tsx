import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root')!); 
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);


reportWebVitals();

