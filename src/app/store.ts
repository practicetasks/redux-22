import {configureStore} from "@reduxjs/toolkit";

import booksReducer from './booksSlice.ts';
import authorsReducer from "./authorsSlice.ts";

export const store = configureStore(
    {
        reducer: {
            books: booksReducer,
            authors: authorsReducer,
        }
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

