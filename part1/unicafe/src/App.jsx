import { useState } from 'react'

const Button = ({ onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({values}) => {
  if (values.total == 0) {
    return ('No feedback given');
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={values.good} />
          <StatisticLine text="neutral" value={values.neutral} />
          <StatisticLine text="bad" value={values.bad} />
          <StatisticLine text="all" value={values.total} />
          <StatisticLine text="average" value={values.average.toFixed(2)} />
          <StatisticLine text="positive" value={values.positivePercentage.toFixed(2) + ' %'} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const total = good + neutral + bad
  const average = (good - bad) / total || 0
  const positivePercentage = (good / total) * 100 || 0
  
  const values = {good, neutral, bad, total, average, positivePercentage};
  
  const handleGoodClick = () => {
    const newValue = good + 1;
    setGood(newValue);
  }
  const handleNeutralClick = () => {
    const newValue = neutral + 1;
    setNeutral(newValue);
  }
  const handleBadClick = () => {
    const newValue = bad + 1;
    setBad(newValue);
  }

  return (
    <div>
      <h1>give feedback</h1>
        <Button onClick={handleGoodClick} text="good" />
        <Button onClick={handleNeutralClick} text="neutral" />
        <Button onClick={handleBadClick} text="bad" />
      <h1>statitics</h1>
        <Statistics values={values} />
    </div>
  )
}

export default App
