import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "./app/store.ts";
import {addBook, type Book} from './app/booksSlice.ts';
import {AuthorPage} from "./AuthorPage.tsx";

export function App() {
    const dispatch = useDispatch<AppDispatch>();
    const books = useSelector((state: RootState) => state.books.books);
    const authors = useSelector((state: RootState) => state.authors.authors);

    function generate() {
        const randomId = Math.random();

        if (authors[0]) {
            const book: Book = {
                id: randomId,
                title: `название #${randomId}`,
                author: authors[0]
            }
            dispatch(addBook(book))
        } else {
            alert('Автор не существует')
        }
    }

    return (
        <>
            <h1>React Redux</h1>
            <form>
                <input placeholder={'title'}/>
                <select>
                    {authors.length > 0 ? authors.map(author => (
                        <option key={author.id}>{author.name}</option>
                    )) : <option disabled>Нет автора</option>}
                </select>
                <button>create</button>
            </form>
            {books.map(book => (
                <p key={book.id}>{book.title} – {book.author.name}</p>
            ))}

            <AuthorPage/>
        </>
    )
}