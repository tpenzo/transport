import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    // token: null,
    user: null,
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        authSaveData: (state, actions) => {
            state.user = actions.payload;
            // state.token = actions.payload.accessToken;
        },

        resetAuthSlice: () => initialState,
    },
});

export const { authSaveData, resetAuthSlice } = authSlice.actions;

export default authSlice.reducer;
