import React from 'react';
import useAppDispatch from '../../hooks/useAppDispatch';
import AppPhoto from '../../components/AppPhoto';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { logout } from '../../redux/slices/authSlice';

function FrontPage() {
  const dispatch = useAppDispatch();
  
  return (
    <div className='container'>
      <AppPhoto
        url={require('../../assets/dali_dark.png')}
      >
      </AppPhoto>
      <div>
        <h1>DALI Crud Template</h1>
      </div>
      <Link to={ROUTES.SIGNIN}>
        <h1>Sign In</h1>
      </Link>
      <Link to={ROUTES.SIGNUP}>
        <h1>Sign Up</h1>
      </Link>
      <Link to={ROUTES.VERIFY}>
        <h1>Verify</h1>
      </Link>
      <Link to={ROUTES.USERS}>
        <h1>Users (admin only)</h1>
      </Link>
      <Link to={ROUTES.RESOURCES}>
        <h1>Resources (user or admin)</h1>
      </Link>
      <button onClick={(e) => dispatch(logout({}))}>Logout</button>
    </div>
  );
}

export default FrontPage;
