
import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_BOOKS } from '../queries';
import BookTable from './BookTable';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genreFilter, setGenreFilter] = useState(null)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <p>Loading...</p>
  }

  if (!result.data) {
    return <div>No data</div>
  }

  const books = result.data.allBooks;
  const allGenres = []
  books.forEach(book => {
    book.genres.forEach(genre => {
      if (!allGenres.includes(genre)) {
        allGenres.push(genre)
      }
    });
  });

  const filteredBooks = books.filter((book) => {
    if (genreFilter) {
      return book.genres.includes(genreFilter)
    }

    return true
  })

  return (
    <div>
      <h2>books</h2>
      {genreFilter && <p>In genre <strong>{genreFilter}</strong></p>}
      <BookTable books={filteredBooks} />
      {
        allGenres.map(genre => (
          <button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>
        ))
      }
      <button onClick={() => setGenreFilter(null)}>All genres</button>

    </div>
  )
}

export default Books