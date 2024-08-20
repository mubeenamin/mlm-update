import { createSlice , PayloadAction } from "@reduxjs/toolkit";

const initialState : boolean = false;

export const LoadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            return action.payload;
        },
    },
});

export const { setLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;