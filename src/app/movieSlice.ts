import * as api from './api.ts';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {createSlice, type PayloadAction
} from "@reduxjs/toolkit";


export type Movie = {
    id: number,
    title: string,
    overview: string,
    popularity: number,
    release_date: string
}

export type MovieResponse = {
    page: number,
    results: Movie[]
}

export type MovieState = {
    movies: Movie[]
    isLoading: boolean,
    error: string | null,
}

const initialState: MovieState = {
    movies: [],
    isLoading: false,
    error: null
}
export const getMovies = createAsyncThunk(
    "movies/getAll",
    () => {
        return api.getAllMovies();
    }
)

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addMovie: (state, action: PayloadAction<Movie>) => {
            state.movies.push(action.payload);
        },

        deleteMovie: (state, action: PayloadAction<number>) => {
            state.movies = state.movies.filter(movie => (
                movie.id !== action.payload
            ));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload.results;
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.isLoading = false;
                if (action.error.message && action.error.message !== 'Rejected') {
                    state.error = action.error.message;
                } else {
                    state.error = 'неизвестная ошибка';
                }
            })
    }
})


export default movieSlice.reducer