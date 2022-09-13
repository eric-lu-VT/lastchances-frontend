import React, { useEffect, useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { signUp } from '../../redux/slices/authSlice';

function SignUpPage() {
  const dispatch = useAppDispatch();
  
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send only if all fields filled in
    if (!name) alert('Please enter your name!');
    else if (!email) alert('Please enter an email address!');
    else if (!password) alert('Please enter a password!');
    else if (!confirmPassword) alert('Please confirm your password!');
    else if (!(password === confirmPassword)) alert('Passwords do not match!');
    else {
      dispatch(signUp({ email, password, name }));
    }
  };

  return (
    <div className='container'>
      <h1>Sign Up</h1>
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" className="submit" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" className="submit" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="submit" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirm Password" className="submit" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <input type="submit" className='button' value="Sign Up" />
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;