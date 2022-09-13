import React, { useEffect, useState } from 'react';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { resendCode, verify, logout } from '../../redux/slices/authSlice';

function SignInPage() {
  const dispatch = useAppDispatch();
  const { id, email } = useAppSelector((state) => state.auth);
  const [code, setCode] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send only if all fields filled in
    if (!code) alert('Please enter a code!');
    else {
      dispatch(verify({ id, email, code }));
    }
  };

  return (
    <div className='container'>
      <h1>Verify</h1>
      <div>Check your Dartmouth email for the 6-digit verification code.</div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Code" className="submit" value={code} onChange={(e) => setCode(e.target.value)} />
        <input type="submit" className='button' value="Validate Code" />
      </form>
      <button className='button' onClick={(e) => dispatch(resendCode({ id, email }))}>Resend Code</button>
      <button className='button' onClick={(e) => dispatch(logout({}))}>Logout</button>
    </div>
  );
}

export default SignInPage;
