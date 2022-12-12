import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes, Route, NavLink,
} from 'react-router-dom';
import useAppSelector from '../hooks/useAppSelector';
import useAppDispatch from '../hooks/useAppDispatch';
import { checkConnection } from '../redux/slices/connectionSlice';
import { ROUTES } from '../utils/constants';
import { UserScopes } from '../redux/slices/authSlice';
import FrontPage from './FrontPage';
import ErrorPage from './ErrorPage';
import ForbiddenPage from './ForbiddenPage';
import SignInPage from './SignInPage';
import { jwtSignIn } from '../redux/slices/authSlice';
import { setBearerToken } from '../utils/localStorage';

interface ProtectedRouteProps {
  allowableScopes: UserScopes[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowableScopes, children }: ProtectedRouteProps) => {
  const { authenticated, role } = useAppSelector((state) => state.auth);

  if (!authenticated) {
    return <SignInPage />
  }
  else if (!allowableScopes.includes(role)) {
    return <ForbiddenPage />
  }
  
  return (
    <>
      {children}
    </>
  );
}

function App() {
  const { isConnected } = useAppSelector((state) => state.connection);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(checkConnection());
  }, []);

  useEffect(() => {
    if (isConnected) {
      console.log(window.location.search);
      if (window.location.search.includes('?token=')) {
        setBearerToken(window.location.search.substring(7));
      }
      dispatch(jwtSignIn({}));
    }
  }, [isConnected])

  if (!isConnected) return <ErrorPage />

  return (
    <Router>
      <Routes>
        <Route 
          path={ROUTES.HOME} 
          element={
            <ProtectedRoute
              allowableScopes={[UserScopes.User, UserScopes.Admin]}
            >
              <FrontPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
