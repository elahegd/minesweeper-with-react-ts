import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../module/GameWithRedux";

export const store = configureStore({
    reducer: {
        game: reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;