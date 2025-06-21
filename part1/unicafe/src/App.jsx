import { useState } from 'react'


const Statistics = (props) => {
  if (props.total != 0) {
    return (
      <div>
        <h1>statistics</h1>
        good {props.good} <br />
        neutral {props.neutral} <br />
        bad {props.bad} <br />
        total {props.total} <br />
        average {(props.good - props.bad) / props.total} <br />
        positive {(props.good * 100) / props.total} %
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
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
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
