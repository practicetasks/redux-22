import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Author} from "./authorsSlice.ts";
import * as api from './api.ts';

export type Book = {
    id: number,
    title: string,
    author: Author
}

export type BookState = {
    books: Book[],
    isLoading: boolean,
    error: string | null,
}

const initialState: BookState = {
    books: [],
    isLoading: false,
    error: null
}

export const getBooks = createAsyncThunk(
    "books/getAll",
    () => {
        return api.getAllBooks();
    }
)

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action: PayloadAction<Book>) => {
            state.books.push(action.payload)
        },
        removeBook: (state, action: PayloadAction<number>) => {
            state.books = state.books.filter(
                (book) => book.id !== action.payload
            )
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.isLoading = false;
                if (action.error.message && action.error.message !== 'Rejected') {
                    state.error = action.error.message;
                } else {
                    state.error = 'неизвестная ошибка, попробуйте позже';
                }
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.books = action.payload;
            })
    }
})

export const {addBook, removeBook} = booksSlice.actions;
export default booksSlice.reducer;

