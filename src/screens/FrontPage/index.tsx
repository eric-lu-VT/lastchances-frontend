import React from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { logout } from '../../redux/slices/authSlice';

function FrontPage() {
  const dispatch = useAppDispatch();
  
  return (
    <div className='container'>
      <div>
        <h1>Last Chances - Stay Thirsty Dartmouth</h1>
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
      <button onClick={(e) => dispatch(logout({}))}>Logout</button>
    </div>
  );
}

export default FrontPage;
