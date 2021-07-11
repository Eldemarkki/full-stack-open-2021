import { useApolloClient } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem("library-user-token") || null)
  const [notification, setNotification] = useState(null)
  const isLoggedIn = token !== null;
  const client = useApolloClient();

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {isLoggedIn && <>
          <button onClick={() => setPage('add')}>Add book</button>
          <button onClick={() => setPage("recommendations")}>Recommendations</button>
          <button onClick={() => logout()}>Logout</button>
        </>
        }
        {!isLoggedIn && <button onClick={() => setPage("login")}>Login</button>}
      </div>
      {notification &&
        <p>{notification}</p>
      }
      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      {page === "recommendations" && <Recommendations />}

      <LoginForm show={page === "login"} setError={setNotification} setToken={setToken} />

    </div>
  )
}

export default App