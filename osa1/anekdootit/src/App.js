import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const setNextAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    console.log(randomIndex)
    setSelected(randomIndex)
  }

  const voteCurrent = () => {
    let pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  let highestIndex = -1;
  let highestValue = -Infinity
  for (let i = 0; i < points.length; i++) {
    if(points[i] > highestValue){
      highestIndex = i
      highestValue = points[i]
    } 
  }

  const highestVotedAnecdote = anecdotes[highestIndex]

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>
      <button onClick={() => voteCurrent()}>Vote current</button>
      <button onClick={() => setNextAnecdote()}>Next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{highestVotedAnecdote}</p>
      <p>Has {highestValue} votes</p>
    </div>
  )
}

export default App