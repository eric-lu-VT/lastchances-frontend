import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { ROUTES, SERVER_URL } from '../../utils/constants';

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  return (
    <div className='container'>
      <button 
        className='button'
        onClick={() => window.open(`${SERVER_URL}auth/cas-signin`, '_self')}
      >
        CAS Sign In
      </button>
    </div>
  );
}

export default SignInPage;