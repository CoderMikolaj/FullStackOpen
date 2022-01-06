import React, {useEffect, useState } from 'react'
import Form from './components/Form'
import InputField from './components/InputField'
import PhonebookContents from './components/PhonebookContents'
import phonebookService from "./services/phonebookCommunication"


const App = () => {


  // State of the app
  const [persons,   setPersons]   = useState([]) 
  const [newName,   setNewName]   = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  // Fetching data from the server
  useEffect(() => { phonebookService.getAll().then(persons => setPersons(persons)) }, [])


  // Event handlers
  const handleNameInputChange   = (event) => setNewName(event.target.value)
  const handleNumberInputChange = (event) => setNewNumber(event.target.value)
  const handleFilterInputChange = (event) => setNewFilter(event.target.value)

  const handleUpdateNumber = () => {
    if (window.confirm(`${newName} already exists in the phonebook. Replace number with a new one?`)) {
      const personToUpdate = persons.find(p => p.name === newName)
      const updatedPerson = {...personToUpdate, number: newNumber}
      phonebookService.update(updatedPerson).then(saved => {
        setPersons(persons.map(p => p.id === saved.id ? saved : p))
        setNewName("")
        setNewNumber("")
      })
    }
  }

  const handleSavePerson = (event) => {
    event.preventDefault()
    if(persons.map(p => p.name).includes(newName)) {
      handleUpdateNumber()
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      phonebookService.create(newPerson).then(readyNewPerson => {
        setPersons(persons.concat(readyNewPerson))
        setNewName("")
        setNewNumber("")
      })
    }
  }

  const handleDeletion = (personToDelete) => {
    if(window.confirm(`Do you really want to delete ${personToDelete.name}?`))
    phonebookService.remove(personToDelete.id).then(response => {
      console.log(response)
      setPersons(persons.filter(p => p.id !== personToDelete.id))
    } )
  }

  
  // Numbers to display
  const filterLower = newFilter.toLowerCase()
  const personsToShow = persons.filter(p => p.name.toLowerCase().includes(filterLower))


  return (
    
    <div>
      <h1>Phonebook</h1>
      <InputField name = "filter shown with" value = {newFilter} onChange = {handleFilterInputChange} />

      <h2>Add a new person</h2>
      <Form handleSavePerson = {handleSavePerson} newName = {newName} handleNameInputChange = {handleNameInputChange}
       newNumber = {newNumber} handleNumberInputChange = {handleNumberInputChange} />

      <h2>Numbers</h2>
      <PhonebookContents persons = {personsToShow} remover = {handleDeletion} />
    </div>
  )
}

export default App