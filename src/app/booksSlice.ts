import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Author} from "./authorsSlice.ts";

export type Book = {
    id: number,
    title: string,
    author: Author
}

export type BookState = {
    books: Book[]
}

const initialState: BookState = {
    books: [
        {id: 1, title: 'название книги 1', author: {id: 1, name: 'author', country: 'UK'}},
        {id: 2, title: 'название книги 2', author: {id: 2, name: 'author', country: 'UK'}},
        {id: 3, title: 'название книги 3', author: {id: 3, name: 'author', country: 'UK'}},
    ]
}

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
    }
})

export const {addBook, removeBook} = booksSlice.actions;
export default booksSlice.reducer;

