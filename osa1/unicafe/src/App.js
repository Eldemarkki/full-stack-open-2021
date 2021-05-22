import React, { useState } from 'react'

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <td>
        {text}
      </td>
      <td>
        {value}
      </td>
    </>
  )
}

const Statistics = ({ stats }) => {
  const sum = stats[0].count + stats[1].count + stats[2].count
  const average = (stats[0].count - stats[2].count) / sum;
  const positive = stats[0].count / sum * 100

  if (sum === 0) {
    return (
      <>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <tr><StatisticLine text={stats[0].label} value={stats[0].count} /></tr>
          <tr><StatisticLine text={stats[1].label} value={stats[1].count} /></tr>
          <tr><StatisticLine text={stats[2].label} value={stats[2].count} /></tr>
          <tr><StatisticLine text="all" value={sum} /></tr>
          <tr><StatisticLine text="average" value={average} /></tr>
          <tr><StatisticLine text="positive" value={Math.round(positive * 10) / 10.0 + " %"} /></tr>
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodLabel = "good"
  const neutralLabel = "neutral"
  const badLabel = "bad"

  const stats = [
    {
      label: goodLabel,
      count: good
    },
    {
      label: neutralLabel,
      count: neutral
    },
    {
      label: badLabel,
      count: bad
    }
  ]

  return (
    <div>
      <h2>Give feedback</h2>
      <Button text={goodLabel} handleClick={() => setGood(good + 1)} />
      <Button text={neutralLabel} handleClick={() => setNeutral(neutral + 1)} />
      <Button text={badLabel} handleClick={() => setBad(bad + 1)} />
      <Statistics stats={stats} />
    </div>
  )
}

export default App