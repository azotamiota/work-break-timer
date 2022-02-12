import { useState } from 'react';
import './Timer.css';

let defaultSessionLength = 25;
let breakLength = 5;
let ticker;
function Timer() {
  const sessionSeconds = defaultSessionLength * 60;
  const [isActive, setActivity] = useState(false);
  const [seconds, setSessionSeconds] = useState(sessionSeconds);

  let clockStyle = () => {
    let displayMinutes = Math.floor(seconds / 60)
    let displaySeconds= seconds - displayMinutes * 60
    displayMinutes = displayMinutes < 10
      ? (displayMinutes = "0" + displayMinutes)
      : displayMinutes;
    displaySeconds = displaySeconds < 10
      ? (displaySeconds = "0" + displaySeconds)
      : displaySeconds;
    return displayMinutes + ':' + displaySeconds;
  }
  
  
  const sessionIncrement = () => {
      if (isActive === false) {
        if (sessionSeconds < 3600) {
          defaultSessionLength++;
          setSessionSeconds(sessionSeconds + 60);
        }
        }
    };
  
  const sessionDecrement = () => {
    if (isActive === false) {
      if (sessionSeconds > 60) {
        defaultSessionLength--;       
        setSessionSeconds(sessionSeconds - 60);
      }
    }
  };

  function timerStarter() {
    
      if (isActive === false) {
        ticker = setInterval(secondDecreaser, 1000);
        setActivity(true);
      } else {
        clearInterval(ticker);
        ticker = null;
        setActivity(false);
      }        
        function secondDecreaser() {
          setSessionSeconds(previousSecs => previousSecs - 1)
        }
      }

  const breakIncrement = () => {
     breakLength++;
     document.getElementById(
       "break-label"
     ).innerHTML = `Break length: ${breakLength}`;
  };

   const breakDecrement = () => {
     breakLength--;
     document.getElementById(
       "break-label"
     ).innerHTML = `Break length: ${breakLength}`;
   };
 
  function reset() {
    clearInterval(ticker);
    ticker = null;
    defaultSessionLength = 25;
    breakLength = 5;
    console.log(defaultSessionLength * 60);
    setActivity(false)
    setSessionSeconds(defaultSessionLength * 60);
  }

  return (
    <>
      <div id="break-label">Break label: {breakLength}</div>
      <div id="session-label">
        Session length: <span id="session-length">{defaultSessionLength}</span> 
      </div>
      <button id="break-decrement" onClick={() => breakDecrement()}>
        Decrease break time
      </button>
      <button id="session-decrement" onClick={() => sessionDecrement()}>
        Decrease session time
      </button>
      <button id="break-increment" onClick={() => breakIncrement()}>
        Increase break time
      </button>
      <button id="session-increment" onClick={() => sessionIncrement()}>
        Increase session time
      </button>
      <div id="break-length">5</div>

      <div id="timer-label">Session</div>
      <div id="time-left">{clockStyle()}</div>
      <button id="start_stop" onClick={timerStarter}>
        Start / Pause
      </button>
      <button id="reset" onClick={reset}>
        Reset
      </button>
    </>
  );
}

export default Timer;
