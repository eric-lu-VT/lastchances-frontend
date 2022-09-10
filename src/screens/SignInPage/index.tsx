import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { signIn } from '../../redux/slices/authSlice';
import { ROUTES } from '../../utils/constants';

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send only if all fields filled in
    if (!email) alert('Please enter an email address!');
    else if (!password) alert('Please enter a password!');
    else {
      dispatch(signIn({ email, password }));
    }
  };

  return (
    <div className='container'>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Sign In" />
      </form>
      <h3>Don't have an accout? 
        <button 
          className='button'
          onClick={() => navigate(ROUTES.SIGNUP)}>
            Sign Up
        </button>
      </h3>
    </div>
  );
}

export default SignInPage;