import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'
import BookTable from './BookTable'

const Recommendations = () => {
  const [allBooksQuery, allBooksResult] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState(null)
  const meResult = useQuery(ME)

  useEffect(() => {
    if (meResult.loading) return;
    if (!meResult.data) return;
    allBooksQuery({ variables: { genre: meResult.data.me.favoriteGenre } })
  }, [allBooksQuery, meResult.data, meResult.loading])
  
  useEffect(() => {
    if (allBooksResult.data) {
      setBooks(allBooksResult.data.allBooks)
    }
  }, [allBooksResult, allBooksResult.data])

  if (meResult.loading) {
    return <div>Loading user...</div>
  }

  if (!meResult.data) {
    return <div>No user data</div>
  }

  const favoriteGenre = meResult.data.me.favoriteGenre;

  if (!books) return <div>Loading books...</div>

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre <strong>{favoriteGenre}</strong></p>
      <BookTable books={books} />
    </div>
  )
}

export default Recommendations