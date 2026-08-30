import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type Author = {
    id: number,
    name: string,
    country: string
}

export type AuthorState = {
    authors: Author[]
}

const initialState: AuthorState = {
    authors: []
}

const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        addAuthor: (state, action: PayloadAction<Author>) => {
            state.authors.push(action.payload);
        }
    }
})

export const {addAuthor} = authorsSlice.actions;
export default authorsSlice.reducer;

