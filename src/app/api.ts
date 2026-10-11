import type {Book} from "./booksSlice.ts";
import type {MovieResponse} from "./movieSlice.ts";

export function getAllBooks(): Promise<Book[]> {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            // resolve([
            //     {id: 1, title: 'название книги 1', author: {id: 1, name: 'author', country: 'UK'}},
            //     {id: 2, title: 'название книги 2', author: {id: 2, name: 'author', country: 'UK'}},
            //     {id: 3, title: 'название книги 3', author: {id: 3, name: 'author', country: 'UK'}},
            // ])

            reject();
        }, 2000)

    })
}


const BASE_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=418969814078357800fcf2d3df514a26&with_original_language=en';

export function getAllMovies(): Promise<MovieResponse> {
    return fetch(BASE_URL)
        .then(resp => resp.json())
        .then(data => {
            // console.log(data)
            return data as MovieResponse;
        })
}