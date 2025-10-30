import React, { useEffect, useState } from 'react';
import { listBooks } from  './api/books';

const th = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
    backgroundColor: '#f2f2f2',
};

const td = {
    border: '1px solid #dddddd',
    textAlign: 'left',
    padding: '8px',
};

export default function BookList({ refreshKey = '' }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const ctrl = new AbortController();
        setLoading(true);
        setError(null);

        listBooks(ctrl.signal)
            .then(setBooks)
            .catch((err) => setError(err))
            .finally(() => setLoading(false));

        return () => ctrl.abort();
    }, [refreshKey]);

    if (loading) return <p>Loading ...</p>;
    if (error) return <p style={{ color: 'crimson' }}>{error.message}</p>;
    if (!books.length) return <p>No books yet.</p>;
    return (
        <div style={{ overflow: 'auto' }}>
            <table style = {{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={th}>ID</th>
                        <th style={th}>Title</th>
                        <th style={th}>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td style={td}>{book.id}</td>
                            <td style={td}>{book.title}</td>
                            <td style={td}>{book.author}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}