import React from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const clockRef = React.useRef();

  React.useEffect(() => {
    clockRef.current = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(clockRef.current);
    }
  }, [])

  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours();

  const secondsStyle = {transform:  `rotate(${seconds * 6}deg)`};
  const minutesStyle = {transform:  `rotate(${minutes * 6}deg)`};
  const hoursStyle = {transform:  `rotate(${hours * 30}deg)`};

  return (
    <div className="page-container">
      <div data-testid="clock" className="clock mt-5">
        <div className="outer-clock-face">
          <div className="marking marking-one"></div>
          <div className="marking marking-two"></div>
          <div className="marking marking-three"></div>
          <div className="marking marking-four"></div>
          <div className="inner-clock-face">
            <div className="hand hour-hand" style={minutesStyle}></div>
            <div className="hand min-hand" style={hoursStyle}></div>
            <div className="hand second-hand" style={secondsStyle}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
