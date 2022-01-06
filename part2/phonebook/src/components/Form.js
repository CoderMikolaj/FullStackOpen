import React from 'react'
import InputField from './InputField'

const Form = (props) => {
    return (
        <form onSubmit = {props.handleSavePerson}>
            <InputField name = "name"   value = {props.newName}   onChange = {props.handleNameInputChange} />
            <InputField name = "number" value = {props.newNumber} onChange = {props.handleNumberInputChange} />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form