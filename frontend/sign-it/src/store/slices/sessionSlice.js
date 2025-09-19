import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: null,
  email: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { setFirstName, setEmail } = sessionSlice.actions;
export default sessionSlice.reducer;
