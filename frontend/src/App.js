import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from "./components/Filter"
import personService from './services/persons'
import { useState, useEffect } from 'react'
import React from 'react'
import Notification from './components/Notfication'
import Error from './components/Notfication'



const App = () => {
    const [persons, setPersons] = useState([

    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState("")
    const [newFilter, setNewFilter] = useState('')
    const [error, setError] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        console.log('effect')
        personService
            .getAll()
            .then(initialPersons =>
                setPersons(initialPersons))
    }, [])


    const handleAddName = (event) => {
        setNewName(event.target.value)
    }
    const handleAddNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilter = (event) => {
        setNewFilter(event.target.value)
    }
    const personsToShow = newFilter === ''
        ? persons
        : persons.filter(person => person['name'].toLowerCase().includes(newFilter.toLowerCase()))


    const addPerson = (event) => {
        event.preventDefault()



        const personObject = {

            name: newName,
            number: newNumber
        }


        const val = persons.map(person => person.name)
        if (val.includes(personObject.name)) {
            if (window.confirm(`${personObject.name} is already added to the phonebook, replace the old number with new one?`)) {
                const user = persons.find(person => person.name === person)
                const changedUser = { ...user, number: personObject.number }
                personService
                    .update(user.id, changedUser)
                    .then(returnedUser => {
                        setPersons(persons.map(person => person.id === user.id ? returnedUser : person))

                        setNotification(`Number for ${user.name} was updated`)
                        setTimeout(() => {
                            setNotification(null)
                        }, 5000)
                    })
            }

        } else {
            personService
                .create(personObject)
                .then(person => {
                    setPersons(persons.concat(person))
                })
        }
        setNewName("")
        setNewNumber("")

    }

    const handleDelete = (personToDelete) => {
        console.log('test', personToDelete)

        if (window.confirm(`Delete ${personToDelete.name}?`)) {
            personService
                .remove(personToDelete.id)
                .then(response => {
                    setPersons(persons.filter(person => person.id !== personToDelete.id))

                })
                .catch(() => {
                    setError(`Information of ${personToDelete.name} has already been removed from the server`)
                    setTimeout(() => {
                        setError(null)
                    }, 5000)
                })

            setPersons(persons.filter(person => person.id !== personToDelete))
        }

    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilter={handleFilter} />
            <Error message={error} />
            <Notification message={notification} />

            <h2>Add a new</h2>

            <PersonForm addPerson={addPerson} handleAddName={handleAddName} handleAddNumber={handleAddNumber} newName={newName} newNumber={newNumber} />


            <h3>Numbers</h3>
            <Persons personsToShow={personsToShow} personsToDelete={handleDelete} filter={newFilter} />

        </div>
    )

}

export default App
