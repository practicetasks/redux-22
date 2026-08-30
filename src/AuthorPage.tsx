import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "./app/store.ts";
import {addAuthor, type Author} from "./app/authorsSlice.ts";

export function AuthorPage() {
    const dispatch = useDispatch<AppDispatch>();
    const authors = useSelector((state: RootState) => state.authors.authors);

    function generate() {
        const randomId = Math.random();

        const author: Author = {
            id: Math.random(),
            name: `автор #${randomId}`,
            country: 'UK'
        }

        dispatch(addAuthor(author))
    }

    return (
        <>
            <h1>Authors Page</h1>
            <button onClick={generate}>Generate book</button>
            {authors.map(author => (
                <p key={author.id}>{author.name} – {author.country}</p>
            ))}
        </>
    )
}