import React from "react"
import Course from "./components/Course"


const App = ({courses}) => {
  
  return (
    <>
      <h1>
        Web development curriculum
      </h1>
      {courses.map(c => <Course key = {c.id} course = {c} />)}
    </>
  )
}


export default App