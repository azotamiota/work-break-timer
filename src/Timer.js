import { useState } from 'react';
import './Timer.css';

let ticker;
function Timer() {
  console.log('does it come back here????')
  let sessionLength = 25
  const sessionIncrement = () => {
    sessionLength++;
document.getElementById('session-label').innerHTML = `Session length: ${sessionLength}`;

  }
  const sessionDecrement = () => {
     sessionLength--;
document.getElementById('session-label').innerHTML = `Session length: ${sessionLength}`;
  };

  let breakLength = 5;
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
 

  const seconds = 1;
  const [isoSeconds, setIsoSeconds] = useState(1500);
  let time = new Date(seconds * 1000 * isoSeconds).toISOString().substring(14, 19);
  const [isActive, setActivity] = useState(false);

 

   function timerStarter() {
        if (isActive === false) {
       setActivity(true);
    
    ticker = setInterval(decreaseSecond, 1000);

  }else {clearInterval(ticker);
    ticker = null;
  setActivity(false)}

   }

   function decreaseSecond() {
        setIsoSeconds((previousSecs) => {
          // values are not changing here!!
          return previousSecs - 1;
        });
    }

  function reset() {
    //console.log('this is passed to clearInterval after pressing reset: ', ticker)
    
document.getElementById("break-length").innerHTML = 'reseted';

  }

  return (
    <>
      <div id="break-label">Break label: {breakLength}</div>
      <div id="session-label">Session length: {sessionLength}</div>
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
      <div id="session-length">{sessionLength}</div>
      <div id="timer-label">Session</div>
      <div id="time-left">
  {time}
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
