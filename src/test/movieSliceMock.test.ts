import {test, vi, expect, describe} from 'vitest';
import reducer, {getMovies, type MovieResponse} from "../app/movieSlice.ts";
import * as api from "../app/api.ts";
import {configureStore} from "@reduxjs/toolkit";

// замена настоящего файла
vi.mock('../app/api.ts', () => ({
    getAllMovies: vi.fn() // подделываем функцию
}))

// берем замоканную функцию, чтобы задать поведение далее в тест-кейсах
const mockedGetAllMovies = vi.mocked(api.getAllMovies)

describe('getMovies', () => {

    // beforeEach(() => {
    //     // действие выполняющееся каждый раз перед тестом
    //
    //     // - очистка предыдущего состояния
    //     // - создание дефолтных объектов
    // })

    test('успешный flow', async () => {
        const response: MovieResponse = {
            page: 1,
            results: [
                {id: 1, title: 'film1', overview: '', popularity: 1, release_date: '2000-01-01'},
                {id: 2, title: 'film2', overview: '', popularity: 1, release_date: '2000-01-01'}
            ]
        }

        mockedGetAllMovies.mockResolvedValue(response)
        const store = configureStore({reducer});

        await store.dispatch(getMovies())

        expect(store.getState().movies).toEqual(response.results);
        expect(store.getState().isLoading).toEqual(false);
        expect(store.getState().error).toEqual(null);
    })


    test('ошибочный flow', async () => {
        const errorMessage = 'Bad Request';
        mockedGetAllMovies.mockRejectedValue(new Error(errorMessage))

        const testStore = configureStore({reducer: reducer})

        await testStore.dispatch(getMovies())

        expect(testStore.getState().movies).toHaveLength(0);
        expect(testStore.getState().isLoading).toEqual(false);
        expect(testStore.getState().error).toEqual(errorMessage);
    })
})