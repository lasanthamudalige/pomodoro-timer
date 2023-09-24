import { useState, useEffect } from 'react'
// import 'bulma/css/bulma.css'
import './App.css'


function App() {
  // React hooks for time left, timer status, on break, breaks, break quotes
  const [timeLeft, updateTime] = useState(1500);
  const [timerStatus, updateTimerStatus] = useState(false);
  const [onBreak, updateBreakStatus] = useState(false);
  const [breaks, updateBrakes] = useState(0);
  const [breakQuote, updateBrakeQuote] = useState('Time to focus!');

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStatus && timeLeft > 0) {
        updateTime(() => timeLeft - 1)
      } if (timeLeft === 0) { // update time for short and long breaks
        if (!onBreak) {
          if (breaks < 3) { // short break
            updateBreakStatus(true)
            updateBrakes(breaks + 1)
            updateTime(300) // 5 min break
            updateBrakeQuote('Time for a short break!')
            // console.log("Nice short break!");
          } else if (breaks == 3) { // long break
            updateBreakStatus(true)
            updateBrakes(0)
            updateTime(900) // 15 min break
            updateBrakeQuote('Take a short walk!')
            // console.log("Watchout a long break!");
          }
        } else if (onBreak) {
          updateBreakStatus(false)
          updateTime(1500) // 25 min
          updateBrakeQuote('Time to focus!')
          // console.log("Back to work!");
        }
      }
    }, 1000);
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.      
  }, [timeLeft, timerStatus, onBreak, breaks])

  const startTimer = () => {
    updateTimerStatus(true)
  }

  const stopTimer = () => {
    updateTimerStatus(false)
  }

  let minutes = Math.floor(timeLeft / 60).toLocaleString(undefined, { minimumIntegerDigits: 2 }); // convert seconds to minutes and round using Math.floor and format the number to 2 digits.
  let seconds = (timeLeft % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 });

  return (
    <div className='container text-center pt-4'>
      <h1 className='display-3 px-5 text-danger fw-semibold'>TomatoTimer</h1>
      <p className='fs-1 pt-5 fw-medium'>Time left</p>
      <p className='fs-2 pb-3 fw-medium'>{minutes} : {seconds}</p>
      <div className='text-center'>
        <button className={`btn ${timerStatus ? 'btn-outline-danger' : 'btn-outline-success'}`} onClick={timerStatus ? stopTimer : startTimer}>{timerStatus ? 'Pause' : 'Start'}</button>
      </div>
      <p className={`pt-5 fs-2 fw-medium ${onBreak ? 'breakQuote' : 'workQuote'} `}>{timerStatus ? breakQuote : ''}</p>
    </div>
  )
}

export default App
