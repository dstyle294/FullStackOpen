import { useState } from 'react'

const StatisticLine = (props) => {
  if (props.text != 'positive') {
    return (
      <div>
        {props.text} {props.value}
      </div>
    )
  }
  return (
    <div>
      {props.text} {props.value} %
    </div>
  )
}

const Statistics = (props) => {
  if (props.total != 0) {
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine text = "good" value = {props.good} />
        <StatisticLine text = "neutral" value = {props.neutral} />
        <StatisticLine text = "bad" value = {props.bad} />
        <StatisticLine text = "total" value = {props.total} />
        <StatisticLine text = "average" value = {(props.good - props.bad) / props.total} />
        <StatisticLine text = "positive" value = {(props.good * 100) / props.total} /> 
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      good {props.good} <br />
      neutral {props.neutral} <br />
      bad {props.bad} <br />
      total 0 <br />
      average 0 <br />
      positive 0%
    </div>
  )
  
}

const Button = (props) => {
  return <button onClick = {props.handler}>{props.text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setTotal(total + 1)
  } 

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)

  }

  const handleBad = () => {
    setBad(bad + 1)
    setTotal(total + 1)
  }

  

  if (total == 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button handler={handleGood} text = 'good' />
        <Button handler={handleNeutral} text = 'neutral' />
        <Button handler={handleBad} text = 'bad' />
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
      <div>
        <h1>give feedback</h1>
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
        <Statistics good={good} neutral = {neutral} bad = {bad} total = {total}/>
      </div>
  )
}

export default App
