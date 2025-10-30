import React, { useState } from 'react';
import { createBook } from '../api/books';

export default function BookForm({ onCreated } = {}) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    const t = title.trim();
    const a = author.trim();
    if (!t || !a) {
      setError(new Error('Title and author are required.'));
      return;
    }
    setLoading(true);
    try {
      await createBook({ title: t, author: a });
      setTitle('');
      setAuthor('');
      if (typeof onCreated === 'function') onCreated();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16, display: 'grid', gap: 8, maxWidth: 520 }}>
      <label style={{ display: 'grid', gap: 4 }}>
        <span>Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Clean Code"
        />
      </label>

      <label style={{ display: 'grid', gap: 4 }}>
        <span>Author</span>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Robert C. Martin"
        />
      </label>

      <div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Book'}
        </button>
      </div>

      {error && <p style={{ color: 'crimson', margin: 0 }}>{error.message}</p>}
    </form>
  );
}