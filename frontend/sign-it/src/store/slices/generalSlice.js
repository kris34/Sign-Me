import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isInputDisable: false
};

const generalSlice = createSlice({
    name: 'general',
    initialState: initialState,
    reducers: {

        setIsInputDisable: (state, action) => {
            state.isInputDisable = action.payload
        }
    }
});

export const { setIsInputDisable } = generalSlice.actions;
export default generalSlice.reducer;