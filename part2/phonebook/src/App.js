import React, {useEffect, useState } from 'react'
import Form from './components/Form'
import InputField from './components/InputField'
import PhonebookContents from './components/PhonebookContents'
import axios from 'axios'


const App = () => {


  // State of the app
  const [persons,   setPersons]   = useState([]) 
  const [newName,   setNewName]   = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  // Fetching data from the server
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => setPersons(response.data))
  }, [])


  // Event handlers
  const handleNameInputChange   = (event) => setNewName(event.target.value)
  const handleNumberInputChange = (event) => setNewNumber(event.target.value)
  const handleFilterInputChange = (event) => setNewFilter(event.target.value)

  const handleSavePerson = (event) => {
    event.preventDefault()
    if(persons.map(p => p.name).includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")
    }
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
      <PhonebookContents persons = {personsToShow} />
    </div>
  )
}

export default App