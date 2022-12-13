import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'
import { store } from './redux/store';
import { getBearerToken } from './utils/localStorage';
import App from './screens/App';
import './styles.scss';
import { jwtSignIn, logout } from './redux/slices/authSlice';

const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container);

const authToken = getBearerToken();
if(authToken) {
  store.dispatch(jwtSignIn(authToken));
} else {
  store.dispatch(logout({}));
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
