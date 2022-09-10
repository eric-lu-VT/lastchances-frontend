import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import { RootState, AppThunk } from '../store';
import axios from 'axios';
import { getBearerToken, setBearerToken } from '../../utils/localStorage.js';
import { UserScopes } from './usersSlice';

export interface AuthState {
  authenticated: boolean,
  loading: boolean,
  id: string,
  email: string,
  name: string,
  role: UserScopes,
}

const initialState: AuthState = {
  authenticated: false,
  loading: false,
  id: '',
  email: '',
  name: '',
  role: UserScopes.Unverified,
};

interface LoginResponse {
  token: string;
  user: {
    id: string,
    email: string,
    // no password  
    name: string,
    role: UserScopes,
  }
}

export const signUp = createAsyncThunk(
  'auth/signup',
  async (credentials: { email: string, password: string, name: string }, { dispatch }) => {
    dispatch(startAuthLoading());
    return await axios
      .post(`${SERVER_URL}auth/signup`, credentials)
      .finally(() => dispatch(stopAuthLoading()))
      .then((response) => {
        alert('Sign up successful!');
        return response.data;
      })
      .catch((error) => {
        console.error('Error when signing up', error);
        return false;
      });
  }
);

export const signIn = createAsyncThunk(
  'auth/signin',
  async (credentials: { email: string, password: string }, { dispatch, getState }) => {
    dispatch(startAuthLoading());
    return await axios
      .post<LoginResponse>(`${SERVER_URL}auth/signin`, credentials)
      .finally(() => dispatch(stopAuthLoading()))
      .then((response) => {
        if (response.status == 403) {
          // forbidden - not verified
          return {
            user: { email: credentials.email },
            verified: false,
          };
        }
        alert('Signed In!');
        return { ...response.data };
      })
      .catch((error) => {
        alert(
          'Unable to log in, please ensure your email and password are correct.'
        );
        console.error('Error when logging in', error);
        throw error;
      });
  }
);

export const jwtSignIn = createAsyncThunk(
  'auth/jwt-signin',
  async (token: string, { dispatch }) => {
    dispatch(startAuthLoading());
    return await axios
      .get<LoginResponse>(`${SERVER_URL}auth/jwt-signin/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .finally(() => dispatch(stopAuthLoading()))
      .then((response) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${token}`; 
        return response.data;
      })
      .catch((err) => {
        console.error(err);
        alert("Your login session has expired.");
        throw err;
      });
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (req: {}, { dispatch }) => {
    dispatch(startAuthLoading());
    return await axios
      .post(`${SERVER_URL}auth/logout`)
      .finally(() => dispatch(stopAuthLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.error('Logout attempt failed', err);
        throw err;
      });
  }
)

export const resendCode = createAsyncThunk(
  'auth/resend-code',
  async (req: { id: string, email: string }) => {
    return await axios
      .post<LoginResponse>(`${SERVER_URL}auth/resend-code/${req.id}`, req)
      .then((response) => {
        if(response.status === 201) {
          return true;
        }
        return isRejectedWithValue(response.statusText);
      })
      .catch((error) => {
        console.error('Error when sending code', error);
      });
  }
);

export const verify = createAsyncThunk(
  'auth/verify',
  async (req: { id: string, email: string; code: string }) => {
    return await axios
      .patch<LoginResponse>(`${SERVER_URL}auth/verify/${req.id}`, req)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when verifying', error);
      });
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      setBearerToken(action.payload.token);
      state = ({ ...state, ...action.payload.user });
      return state;
    },
    startAuthLoading: (state) => ({ ...state, loading: true }),
    stopAuthLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      if ('token' in action.payload) {
        setBearerToken(action.payload.token);
        state = ({ ...state, ...action.payload.user });
        state.authenticated = true;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${action.payload.token}`; 
        return state;
      }
    });
    builder.addCase(jwtSignIn.fulfilled, (state, action) => {
      state = ({ ...state, ...action.payload.user });
      state.authenticated = true;
      return state;
    });
    builder.addCase(jwtSignIn.rejected, () => initialState);
    builder.addCase(logout.fulfilled, () => {
      setBearerToken('');
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${''}`;
      alert('Logged out of account');
      return initialState;
    })
    builder.addCase(resendCode.fulfilled, () => {
      alert('Code sent to your email');
    });
    builder.addCase(resendCode.rejected, () => {});
    builder.addCase(verify.fulfilled, (state, action) => {
      if (action.payload) {
        setBearerToken(action.payload.token);
        state = ({ ...state, ...action.payload.user });
        state.authenticated = true;
      }
      alert('Your account has been authorized!')
      return state;
    });
  },
});

export const { setCredentials, startAuthLoading, stopAuthLoading } =
  authSlice.actions;

export default authSlice.reducer;