import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import { RootState, AppThunk } from '../store';
import axios from 'axios';

export interface DartQuery {
  name: string,
  last_name: string,
  cache_date: string,
  suffix: string,
  first_name: string,
  netid: string,
  email: string,
  prefix: string,
  middle_name: string,
  campus_address: string,
}

export interface DartState {
  loading: boolean,
  search: DartQuery[],
}

const initialState: DartState = {
  loading: false,
  search: [],
};

export const getDartUsers = createAsyncThunk(
  'dart/searchName',
  async (req: { first_name: string, middle_name: string, last_name: string }, { dispatch }) => {
    dispatch(startDartLoading());
    return await axios
      .get<DartQuery[]>(`${SERVER_URL}dart/searchName?first_name=${req.first_name}&middle_name=${req.middle_name}&last_name=${req.last_name}`)
      .finally(() => dispatch(stopDartLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        alert('Error when getting users from Dartmouth API: ' + error.response.data.errors[0]);
        return false;
      });
  }
);

export const dartSlice = createSlice({
  name: 'dart',
  initialState,
  reducers: {
    startDartLoading: (state) => ({ ...state, loading: true }),
    stopDartLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(getDartUsers.fulfilled, (state, action) => {
      const users: DartQuery[] = action.payload as DartQuery[];
      state.search = [];
      users.forEach((user: DartQuery) => {
        state.search.push(user);
      });
    });
  }
});

export const { startDartLoading, stopDartLoading } =
  dartSlice.actions;

export default dartSlice.reducer;