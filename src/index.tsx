import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'
import { store } from './redux/store';
import { getBearerToken } from './utils/localStorage';
import { jwtSignIn, logout } from './redux/slices/authSlice';
import theme from './utils/theme';
import AppLayout from './components/AppLayout';
import App from './screens/App';
import './utils/global.css';

const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container);

// TODO: Double login
const authToken = getBearerToken();
if (authToken) {
  store.dispatch(jwtSignIn(authToken));
} else {
  store.dispatch(logout({}));
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AppLayout>
          <App />
        </AppLayout>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
