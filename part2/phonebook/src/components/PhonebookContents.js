import React from "react"

const PhonebookContents = ({persons, remover}) => {
    return( 
        persons.map(p => {
            return (
                <div key = {p.id}>
                    {p.name} {p.number} <button onClick = {() => remover(p)}>delete</button>
                </div>
            )
        })
    )
}

export default PhonebookContents