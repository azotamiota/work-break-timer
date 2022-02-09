import { useState } from 'react';
import './Timer.css';

function Timer() {
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

  const [minutes, setMinutes] = useState('25')
  const [seconds, setSeconds] = useState('0')
  let ticker; 

  const timerStarter = () => {
document.getElementById("seconds-left").innerHTML = seconds;
ticker = setInterval(() => {
  setSeconds((previousSecs) => {return previousSecs - 1})
}, 1000)

  }

  const reset = () => {
    clearInterval(ticker)
document.getElementById("break-length").innerHTML = 5;
document.getElementById("session-length").innerHTML = `${minutes}:${seconds}`;


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
        <span id="minutes-left">{minutes}</span>:
        <span id="seconds-left">{seconds}</span>
      </div>
      <button id="start_stop" onClick={() => timerStarter()}>
        Start / Pause
      </button>
      <button id="reset" onClick={() => reset()}>
        Reset
      </button>
    </>
  );
}

export default Timer;
