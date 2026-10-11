import {describe, expect, test} from 'vitest';
import authorReducer, {addAuthor, type Author, type AuthorState} from "../app/authorsSlice.ts";


const initialState: AuthorState = {
    authors: []
}
test('должен добавить автора', () => {
    const author: Author = {
        id: 1,
        name: 'George Orwell',
        country: 'UK',
    }

    const state = authorReducer(initialState, addAuthor(author));
    expect(state.authors).toHaveLength(1);
    expect(state.authors[0]).toEqual(author);
})


test('должен добавлять нескольких авторов', () => {
    const author1: Author = {
        id: 1,
        name: 'George Orwell',
        country: 'UK',
    }

    const author2: Author = {
        id: 2,
        name: 'Другой автор',
        country: 'UK',
    }

    let state = authorReducer(initialState, addAuthor(author1));
    state = authorReducer(state, addAuthor(author2));

    expect(state.authors).toHaveLength(2);
    expect(state.authors).toEqual([author1, author2])
})

// test('проверка на содержание элемента в массиве', () => {
//     const array = ['A', 'B'];
//
//     expect(array).contains("A");
//     expect(array).contains("B");
//     expect(array).not.contains("B");
//
//
// })

// test('проверка объектов', () => {
//     const object1 = {name: "Bob"};
//     const object2 = {name: "Bob"};
//
//     expect(object1).eq(object2)
//
//     expect(object1).toEqual(object2)
//
//     const array1 = ['A', 'B', 'C'];
//     const array2 = ['A', 'B', 'C'];
//
//     expect(array1).toEqual(array2)
//
//
//     // vitest - jest, chai
//
// })

