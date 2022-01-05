import React, { useState } from 'react'


const Button = ({handler, text}) =>  <button onClick={handler}> {text} </button>

const StatisticLine = ({name, value}) => <tr><td>{name}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const avg = (good - bad) / all
  const pos = good / all * 100

  if (all === 0) { return ( <div> No feedback given </div> ) }

  return (
    <table>
      <tbody>
        <StatisticLine name = "good"      value = {good} />
        <StatisticLine name = "neutral"   value = {neutral} />
        <StatisticLine name = "bad"       value = {bad} />
        <StatisticLine name = "all"       value = {all} />
        <StatisticLine name = "average"   value = {avg} />
        <StatisticLine name = "positive"  value = {pos + "%"} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good,    setGood   ] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad,     setBad    ] = useState(0)

  return (
    <>
      <h1>
        give feedback
      </h1>
      <Button handler = {() => setGood(good + 1)}       text = "good" />
      <Button handler = {() => setNeutral(neutral + 1)} text = "neutral" />
      <Button handler = {() => setBad(bad + 1)}         text = "bad" />
      <h1>
        statistics
      </h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </>
  )
}

export default App