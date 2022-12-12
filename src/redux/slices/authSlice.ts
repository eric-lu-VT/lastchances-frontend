import { createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import { RootState, AppThunk } from '../store';
import axios from 'axios';
import { getBearerToken, setBearerToken } from '../../utils/localStorage.js';

export enum UserScopes {
  User = 'USER',
  Admin = 'ADMIN',
}

export interface AuthState {
  authenticated: boolean,
  loading: boolean,
  id: string,
  netid: string,
  email: string,
  name: string,
  role: UserScopes,
}

const initialState: AuthState = {
  authenticated: false,
  loading: false,
  id: '',
  netid: '',
  email: '',
  name: '',
  role: UserScopes.User,
};

interface LoginResponse {
  token: string;
  user: {
    id: string,
    netid: string,
    email: string,
    name: string,
    role: UserScopes,
  }
}

export const jwtSignIn = createAsyncThunk(
  'auth/jwt-signin',
  async (req: unknown, { dispatch }) => {
    const token = getBearerToken();
    if (!token) {
      throw Error('null token');
    }
    
    dispatch(startAuthLoading());
    return await axios
      .get<LoginResponse>(`${SERVER_URL}auth/jwt-signin`, {
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

// TODO
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
      // alert('Logged out of account');
      return initialState;
    })
  },
});

export const { setCredentials, startAuthLoading, stopAuthLoading } =
  authSlice.actions;

export default authSlice.reducer;