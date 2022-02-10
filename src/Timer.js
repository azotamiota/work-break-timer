import { useState } from 'react';
import './Timer.css';

let sessionLength = 25;
let ticker;
function Timer() {
  const [isoSeconds, setIsoSeconds] = useState(sessionLength * 60);
  let time = new Date(sessionLength * 60 * 1000).toISOString().substring(14, 19);

    const sessionIncrement = () => {
    sessionLength += 1;
      let updatedTime = new Date(sessionLength * 60 * 1000)
        .toISOString()
        .substring(14, 19);
      document.getElementById(
        "session-label"
      ).innerHTML = `Session length: ${updatedTime}`;
    document.getElementById("time-left").innerHTML = updatedTime;
    }
  
  const sessionDecrement = () => {
    sessionLength -= 1;
    let updatedTime = new Date(sessionLength * 60 * 1000)
      .toISOString()
      .substring(14, 19);
    document.getElementById(
      "session-label"
    ).innerHTML = `Session length: ${updatedTime}`;
    document.getElementById("time-left").innerHTML = updatedTime;
  };
  

  const [isActive, setActivity] = useState(false);
  function timerStarter() {
       if (isActive === false) {
      setActivity(true);
       ticker = setInterval(setIsoSeconds((previousSecs) => {
          return previousSecs - 1;
        }), 1000);
  
       }else {clearInterval(ticker);
       ticker = null;
        setActivity(false)}
  
  }

//  let sessionLength = new Date(userSetIsoSecondsSession * 1000)
//    .toISOString()
//    .substring(14, 19);


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
 

   

  function reset() {
    //console.log('this is passed to clearInterval after pressing reset: ', ticker)
    setIsoSeconds(sessionLength * 60);
    clearInterval(ticker);
    ticker = null;
document.getElementById("break-length").innerHTML = 'reseted';

  }

  return (
    <>
      <div id="break-label">Break label: {breakLength}</div>
      <div id="session-label">Session length: {time}</div>
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
      {/* <div id="session-length">{sessionLength}</div> */}
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
