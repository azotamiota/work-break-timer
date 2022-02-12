import { useState } from 'react';
import './Timer.css';

let defaultSessionLength = 25;
let breakLength = 5;
let ticker;
function Timer() {
  const defaultIsoSeconds = defaultSessionLength * 60;
  const [isoSeconds, setIsoSeconds] = useState(defaultIsoSeconds);
  let countingTime = new Date(isoSeconds * 1000).toISOString().substring(14, 19);

    const sessionIncrement = () => {
      if (isActive === false) {
        if (defaultSessionLength <= 59) {
          defaultSessionLength++;
          setIsoSeconds(defaultIsoSeconds + 60);
        }
        }
    };
  
  const sessionDecrement = () => {
    if (isActive === false) {
      if (defaultSessionLength >= 2) {
     defaultSessionLength--;
        setIsoSeconds(defaultIsoSeconds - 60);
      }
    }
  };

  const [isActive, setActivity] = useState(false);
  //useEffect(() => {setActivity(true)}, []);

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
          setIsoSeconds(previousSecs => previousSecs - 1)
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
    console.log(defaultSessionLength * 60);
    setActivity(false)
    setIsoSeconds(defaultSessionLength * 60);
  }

  return (
    <>
      <div id="break-label">Break label: {breakLength}</div>
      <div id="session-label">Session length: {defaultSessionLength}</div>
      <button id="break-decrement" onClick={() => breakDecrement()}>
        Decrease break time
      </button>
      <button id="session-decremenet" onClick={() => sessionDecrement()}>
        Decrease session time
      </button>
      <button id="break-increment" onClick={() => breakIncrement()}>
        Increase break time
      </button>
      <button id="session-incremenet" onClick={() => sessionIncrement()}>
        Increase session time
      </button>
      <div id="break-length">5</div>
      {/* <div id="session-length">{SessionLength}</div> */}
      <div id="timer-label">Session</div>
      <div id="time-left">
        {countingTime}
      </div>
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
