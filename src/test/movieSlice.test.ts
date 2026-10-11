import {expect, test} from 'vitest';
import reducer, {getMovies, type MovieResponse, type MovieState} from "../app/movieSlice.ts";

const defaultState: MovieState = {
    movies: [],
    isLoading: false,
    error: null
}
test('getMovies.pending', () => {
    const state = reducer(defaultState, getMovies.pending(''));

    expect(state.isLoading).toEqual(true)
})

test('getMovies.fulfilled', () => {
    const initialState: MovieState = {
        ...defaultState,
        isLoading: true
    }

    const movies: MovieResponse = {
        page: 1,
        results: [
            {id: 1, title: 'film1', overview: '', popularity: 1, release_date: '2000-01-01'},
            {id: 2, title: 'film2', overview: '', popularity: 1, release_date: '2000-01-01'}
        ]
    }

    const state = reducer(initialState, getMovies.fulfilled(movies, ''));

    expect(state.movies).toEqual(movies.results);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(null);
})

test('getMovies.rejected', () => {
    const initialState: MovieState = {
        ...defaultState,
        isLoading: true
    }

    const errorMessage = '500 Internal Server Error';

    const state = reducer(initialState, getMovies.rejected(new Error(errorMessage), ''));

    expect(state.movies).toHaveLength(0);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(errorMessage);
})


