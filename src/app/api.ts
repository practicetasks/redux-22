import type {Book} from "./booksSlice.ts";

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