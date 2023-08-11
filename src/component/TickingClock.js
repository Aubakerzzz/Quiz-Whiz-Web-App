import React, { useEffect } from 'react';

export function TickingClock(props) {
  const { timeRemaining } = props;

  useEffect(() => {
    if (timeRemaining < 10) {
      const msg = new SpeechSynthesisUtterance(timeRemaining);
      msg.lang = 'en-US';
      msg.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Google US English');
      msg.rate = 3.2; // Increase the speech rate (adjust as needed)
      window.speechSynthesis.speak(msg);
    }
  }, [timeRemaining]);

  return (
    <p className='quiz-time'>
      Time Remaining: <span className={timeRemaining < 10 ? 'red-text1' : ''}>{timeRemaining}</span> seconds
    </p>
  );
}

export default TickingClock;
