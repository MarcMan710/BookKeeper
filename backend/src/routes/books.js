const express = require('express');
const router = express.Router();
const { query, run } = require('../database');

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await query('SELECT * FROM books ORDER BY created_at DESC');
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Get a single book by ID
router.get('/:id', async (req, res) => {
  try {
    const books = await query('SELECT * FROM books WHERE id = ?', [req.params.id]);
    if (books.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(books[0]);
  } catch (err) {
    console.error('Error fetching book:', err);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// Create a new book
router.post('/', async (req, res) => {
  const { title, author, genre, year } = req.body;

  // Validate required fields
  if (!title || !author || !genre || !year) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await run(
      'INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)',
      [title, author, genre, year]
    );

    const newBook = await query('SELECT * FROM books WHERE id = ?', [result.id]);
    res.status(201).json(newBook[0]);
  } catch (err) {
    console.error('Error creating book:', err);
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// Update a book
router.put('/:id', async (req, res) => {
  const { title, author, genre, year } = req.body;
  const bookId = req.params.id;

  // Validate required fields
  if (!title || !author || !genre || !year) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await run(
      'UPDATE books SET title = ?, author = ?, genre = ?, year = ? WHERE id = ?',
      [title, author, genre, year, bookId]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const updatedBook = await query('SELECT * FROM books WHERE id = ?', [bookId]);
    res.json(updatedBook[0]);
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const result = await run('DELETE FROM books WHERE id = ?', [req.params.id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

module.exports = router; 