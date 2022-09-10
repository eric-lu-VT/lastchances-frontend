import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import { RootState, AppThunk } from '../store';
import axios from 'axios';

export interface IFollowing {
  id: string;
  followedName: string;
  followedEmail: string; 
  followerId: string;
}

export interface FollowingState {
  loading: boolean,
  crushes: Record<string, IFollowing>,
  matches: Record<string, IFollowing>,
}

const initialState: FollowingState = {
  loading: false,
  crushes: {},
  matches: {},
};

export const getMatches = createAsyncThunk(
  'followings/matches',
  async (req: { userId: string }, { dispatch }) => {
    dispatch(startFollowingLoading());
    return await axios
      .get<IFollowing[]>(`${SERVER_URL}followings/matches/${req.userId}`)
      .finally(() => dispatch(stopFollowingLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when getting matches for user', error);
        return false;
      });
  }
);

export const createFollowing = createAsyncThunk(
  'followings/createFollowing',
  async (req: { title: string, description: string, value: number }, { dispatch }) => {
    dispatch(startFollowingLoading());
    return await axios
      .post(`${SERVER_URL}followings/`, req)
      .finally(() => dispatch(stopFollowingLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error('Error when creating following', error);
        return false;
      });
  }
);

export const followingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {
    startFollowingLoading: (state) => ({ ...state, loading: true }),
    stopFollowingLoading: (state) => ({ ...state, loading: false }),
  },
  extraReducers: (builder) => {
    builder.addCase(getMatches.fulfilled, (state, action) => {
      const followings: IFollowing[] = action.payload as IFollowing[];
      followings.forEach((following: IFollowing) => {
        state.matches[following.id] = following;
      });
    });
    builder.addCase(createFollowing.fulfilled, (state, action) => {
      const following: IFollowing = action.payload as IFollowing;
      state.crushes[following.id] = following;
      alert('Created following as: ' + JSON.stringify(action.payload));
    });
  }
});

export const { startFollowingLoading, stopFollowingLoading } =
  followingSlice.actions;

export default followingSlice.reducer;
