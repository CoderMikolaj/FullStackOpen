import React from "react"

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.map(p => p.exercises).reduce((a,b) => a + b)
    return(
      <b>Total number of exercises {sum}</b>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      course.parts.map(p => 
        <Part key = {p.id} part = {p} />
      )
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course = {course} />
        <Content course = {course} />
        <Total course = {course} />
      </div>
    )
  }


  export default Course