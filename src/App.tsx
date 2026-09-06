import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "./app/store.ts";
import {useEffect} from "react";
import {getBooks} from "./app/booksSlice.ts";

export function App() {
    const dispatch = useDispatch<AppDispatch>();
    const {isLoading, books, error} = useSelector((state: RootState) => state.books);

    useEffect(() => {
        dispatch(getBooks());
    }, []);

    if (isLoading) {
        return <p>Загрузка....</p>
    }

    if (error) {
        return <p style={{color: 'red'}}>{error}</p>
    }

    return (
        <>
            {books.map(book => (
                <p key={book.id}>{book.title}</p>
            ))}
        </>
    )
}