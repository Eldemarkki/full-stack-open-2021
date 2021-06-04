import React, { useState, useEffect } from 'react'
import contactService from "./services/contacts"

const Numbers = ({ persons, nameFilter, setPersons, setNotificationMessage, setErrorMessage }) => {
  const askDeleteContact = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      contactService.deleteContact(id)
        .then(() => {
          contactService.getAll().then(contacts => {
            setPersons(contacts)
          })

          setNotificationMessage(`Deleted contact '${name}'`)
          setTimeout(() => { setNotificationMessage(null) }, 5000)
        })
        .catch(() => {
          alert("The contact was already deleted on the server.")
          setErrorMessage(`'${name}' was already deleted on the server`)
          setTimeout(() => { setErrorMessage(null) }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  console.log(persons)
  return (
    persons.filter(p => p.name.toLowerCase().includes(nameFilter)).map(person => {
      return (
        <div key={person.name}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => askDeleteContact(person.id, person.name)}>delete</button>
        </div>
      )
    })
  )
}

const PersonForm = ({ persons, setPersons, setNotificationMessage, setErrorMessage }) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const onNameChanged = (event) => setNewName(event.target.value)
  const onNumberChanged = (event) => setNewNumber(event.target.value)

  const onFormSubmit = (event) => {
    event.preventDefault()

    const person = persons.find(p => p.name === newName)
    if (person) {
      if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with the new one?`)) {
        const contact = persons.find(n => n.id === person.id)
        const changedContact = { ...contact, number: newNumber }

        contactService.editContact(changedContact).then(response => {
          setPersons(persons.map(p => p.id !== person.id ? p : response.data))
        })

        setNotificationMessage(`Updated the phone number of '${person.name}'`)
        setTimeout(() => { setNotificationMessage(null) }, 5000)
      }
    }
    else {
      const contactObject = { name: newName, number: newNumber }
      contactService.add(contactObject).then(newContact => {
        console.log(newContact)
        setPersons([...persons, newContact])
        setNotificationMessage(`Added contact '${newName}'`)
        setTimeout(() => { setNotificationMessage(null) }, 5000)
      }).catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div>name: <input value={newName} onChange={onNameChanged} /></div>
      <div>number: <input value={newNumber} onChange={onNumberChanged} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const NameFilter = ({ nameFilterValue, onNameFilterChanged }) => {
  return <div>filter shown with: <input value={nameFilterValue} onChange={onNameFilterChanged} /></div>
}

const Notification = ({ notificationMessage, color }) => {
  if (notificationMessage === null)
    return null;

  return (
    <div style={{
      border: `5px solid ${color}`,
      borderRadius: "8px",
      backgroundColor: "lightgray",
      margin: "15px auto",
      fontSize: "20px",
      paddingLeft: "15px",
      color: color,
    }}>
      <p>{notificationMessage}</p>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    contactService.getAll().then(contacts => {
      console.log(contacts)
      setPersons(contacts)
    })
  }, [])

  const [nameFilter, setNameFilter] = useState('')
  const onNameFilterChanged = (event) => setNameFilter(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notificationMessage={notificationMessage} color="green" />
      <Notification notificationMessage={errorMessage} color="red" />
      <NameFilter nameFilterValue={nameFilter} onNameFilterChanged={onNameFilterChanged} />

      <h3>Add a new contact</h3>
      <PersonForm persons={persons} setPersons={setPersons} setNotificationMessage={setNotificationMessage} setErrorMessage={setErrorMessage}/>

      <h3>Numbers</h3>
      <Numbers persons={persons} nameFilter={nameFilter} setPersons={setPersons} setErrorMessage={setErrorMessage} setNotificationMessage={setNotificationMessage} />

    </div>
  )

}

export default App