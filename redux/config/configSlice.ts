import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ConfigState {
    url: string;
    locale: string;
}

// Define the initial state using that type
const initialState: ConfigState = {
    url: 'api',
    locale: 'en',
};

export const configSlice = createSlice({
    name: 'config',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUrl: (state, action: PayloadAction<string>) => {
            console.log(state);

            state.url = action.payload;
            console.log(state);
        },
        setLocale: (state, action: PayloadAction<string>) => {
            state.locale = action.payload;
        },
    },
});

export const { setUrl, setLocale } = configSlice.actions;

export default configSlice.reducer;
