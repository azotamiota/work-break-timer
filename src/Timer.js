import { useEffect, useState } from 'react';
import './Timer.css';

let defaultSessionLength = 25;
let defaultBreakLength = 5;
let ticker;
function Timer() {
  const [panelLabel, setPanelLabel] = useState('Session')
  const sessionSeconds = defaultSessionLength * 60;
  const breakSeconds = defaultBreakLength * 60
  const [isSessionRound, setSessionRound] = useState(true)
  const [isCountdownActive, setCountdownActivity] = useState(false);
  const [leftSeconds, setLeftSeconds] = useState(sessionSeconds);

  let clockStyle = () => {
      let displayMinutes = Math.floor(leftSeconds / 60);
      let displaySeconds = leftSeconds - displayMinutes * 60;
      displayMinutes =
        displayMinutes < 10
          ? (displayMinutes = "0" + displayMinutes)
          : displayMinutes;
      displaySeconds =
        displaySeconds < 10
          ? (displaySeconds = "0" + displaySeconds)
          : displaySeconds;
      return displayMinutes + ":" + displaySeconds;
    
  }
  
  
  const sessionIncrement = () => {
      if (isCountdownActive === false) {
        if (sessionSeconds < 3600) {
          defaultSessionLength++;
          setLeftSeconds(sessionSeconds + 60);
        }
        }
    };
  
    const sessionDecrement = () => {
      if (isCountdownActive === false) {
        if (sessionSeconds > 60) {
          defaultSessionLength--;       
          setLeftSeconds(sessionSeconds - 60);
        }
      }
    };
    const breakIncrement = () => {
        if (isCountdownActive === false) {
          if (defaultBreakLength < 60) {
            defaultBreakLength++;
            document.getElementById("break-length").innerHTML =
              defaultBreakLength;
          }
        }
    };
     const breakDecrement = () => {
       if (isCountdownActive === false) {
         if (defaultBreakLength > 1) {
          defaultBreakLength--;
          document.getElementById("break-length").innerHTML =
            defaultBreakLength;
         }
       }
     };
    
  function timerToggle() {
      if (isCountdownActive === false) {
        ticker = setInterval(secondDecreaser, 50);
        setCountdownActivity(true);
      } else {
        clearInterval(ticker);
        ticker = null;
        setCountdownActivity(false);
      }        
        function secondDecreaser() {
          setLeftSeconds(previousSecs => previousSecs - 1)
        }
  }

    useEffect(() => {
      if (leftSeconds === 0) {
        if (isSessionRound) {
          document.getElementById('beep').play()
          setPanelLabel("Break");
          console.log('switched to break countdown')
          setLeftSeconds(breakSeconds);
          setSessionRound(false);
          
        } else {
          document.getElementById("beep").play();
          setPanelLabel("Session");
          setLeftSeconds(defaultSessionLength * 60);
          setSessionRound(true);
          console.log("switched to session countdown");
        }
        
      }
    }, [leftSeconds]
    )
 
  function reset() {
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
    setPanelLabel("Session");
    clearInterval(ticker);
    ticker = null;
    defaultSessionLength = 25;
    defaultBreakLength = 5;
    setCountdownActivity(false)
    setLeftSeconds(defaultSessionLength * 60);
    setSessionRound(true);
   document.getElementById("break-length").innerHTML = 5;
    
  }

  return (
    <>
      <div id="break-label">
        Break label: <span id="break-length">5</span>
      </div>
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
      <section id="session-timer-panel">
        <div id="timer-label">{panelLabel}</div>
        <div id="time-left">{clockStyle()}</div>
      </section>
      <button id="start_stop" onClick={timerToggle}>
        Start / Pause
      </button>
      <button id="reset" onClick={reset}>
        Reset
      </button>
      <audio id='beep' src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
    </>
  );
}

export default Timer;
