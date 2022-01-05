import React, { useState } from 'react'


// Excludes the max, will not return dismiss
function rndInt(min, max, dismiss) {
  const result = Math.floor(Math.random() * (max - min) ) + min
  if (result === dismiss) {
    return rndInt(min, max, dismiss)
  } else {
    return result
  }
}

const Button = ({handler, text}) =>  <button onClick = {handler}> {text} </button>

const Anecdote = ({anecdote, voteNum}) => {
  return(
    <div>
      <p>
        {anecdote}
      </p>
      <p>
        This anecdote has {voteNum} votes
      </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

   
  const [selected, setSelected] = useState(0)
  const [votes,    setVotes   ] = useState( () => anecdotes.map(x => 0) )  // I didn't want an array to be created every time app rerenders

  const mostVoted = votes.indexOf(Math.max(...votes))

  const voteHandler = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const newAnecdoteHandler = () => {
    setSelected(rndInt(0, anecdotes.length, selected))
  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      <Anecdote anecdote = {anecdotes[selected]} voteNum = {votes[selected]} />
      <div>
        <Button handler = {voteHandler}        text = "vote" />
        <Button handler = {newAnecdoteHandler} text = "new anecdote" />
      </div>
      <h1>
        Anecdote with most votes
      </h1>
      <Anecdote anecdote = {anecdotes[mostVoted]} voteNum = {votes[mostVoted]} />
    </div>
  )
}

export default App