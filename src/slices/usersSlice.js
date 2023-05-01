// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState({
    currentUserId: null,
  }),
  reducers: {
    addUser: usersAdapter.addOne,
    addUsers: usersAdapter.addMany,
    setCurrentUserId: (state, { payload }) => {
      // eslint-disable-next-line no-param-reassign
      state.currentUserId = payload;
    },
  },
});

export const { actions } = usersSlice;
export const selectors = usersAdapter.getSelectors((state) => state.users);
export default usersSlice.reducer;
