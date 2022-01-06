import React from "react"

const PhonebookContents = ({persons}) => {
    return( 
        persons.map(p => <div key = {p.name}>{p.name} {p.number}</div>)
    )
}

export default PhonebookContents