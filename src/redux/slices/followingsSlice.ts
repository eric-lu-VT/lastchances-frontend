import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SERVER_URL } from '../../utils/constants.js';
import { RootState, AppThunk } from '../store';
import axios from 'axios';

export interface IFollowing {
  id: string;
  followedName: string;
  followedNetId: string; 
  followerNetId: string;
  followerUserId: string;
}

export interface FollowingState {
  loading: boolean,
  crushes: IFollowing[],
  matches: IFollowing[],
}

const initialState: FollowingState = {
  loading: false,
  crushes: [],
  matches: [],
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
        alert('Error when getting matches: ' + error.response.data.errors[0]);
        return false;
      });
  }
);

export const createFollowing = createAsyncThunk(
  'followings/createFollowing',
  async (req: { followedName: string, followedNetId: string, followerNetId: string, followerUserId: string }, { dispatch }) => {
    dispatch(startFollowingLoading());
    return await axios
      .post(`${SERVER_URL}followings/${req.followerUserId}`, req)
      .finally(() => dispatch(stopFollowingLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        alert('Error when creating following: ' + error.response.data.errors[0]);
        return false;
      });
  }
);

export const getFollowings = createAsyncThunk(
  'followings/getFollowings',
  async (req: { userId: string }, { dispatch }) => {
    dispatch(startFollowingLoading());
    return await axios
      .get(`${SERVER_URL}followings/${req.userId}`)
      .finally(() => dispatch(stopFollowingLoading()))
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        alert('Error when getting followings: ' + error.response.data.errors[0]);
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
      state.matches = [];
      followings.forEach((following: IFollowing) => {
        state.matches.push(following);
      });
    });
    builder.addCase(createFollowing.fulfilled, (state, action) => {
      const following: IFollowing = action.payload as IFollowing;
      if(following) {
        state.crushes.push(following);
        alert('Created following for: ' + following.followedName + ', netid =' + following.followedNetId + '>');
      }
    });
    builder.addCase(getFollowings.fulfilled, (state, action) => {
      const followings: IFollowing[] = action.payload as IFollowing[];
      state.crushes = [];
      followings.forEach((following: IFollowing) => {
        state.crushes.push(following);
      });
    });
  }
});

export const { startFollowingLoading, stopFollowingLoading } =
  followingSlice.actions;

export default followingSlice.reducer;
