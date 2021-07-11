import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [authorName, setAuthorName] = useState("")
  const [born, setBorn] = useState("")

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const onSubmitForm = (e) => {
    e.preventDefault();
    console.log(authorName)
    editAuthor({ variables: { name: authorName, setBornTo: Number(born) } })
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  if(!result.data){
    return <div>No data</div>
  }

  const authors = result.data.allAuthors;
  if(!authorName){
    setAuthorName(authors[0].name)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={onSubmitForm}>
          <select value={authorName} onChange={(e) => setAuthorName(e.target.value)}>
            {authors.map(author => (
              <option value={author.name} key={author.name}>{author.name}</option>
            ))}
          </select>
          <br />
          <input type="number" value={born} onChange={e => setBorn(e.target.value)} />
          <br />
          <input type="submit" value="Update author" />
        </form>
      </div>
    </div>
  )
}

export default Authors