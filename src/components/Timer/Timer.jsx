import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Timer = ({
  day = 0,
  hour = 0,
  minute = 0,
  second = 0,
  dayLabel = 'ngày',
  hourLabel = 'giờ',
  minuteLabel = 'phút',
  secondLabel = 'giây',
  vertical = false,
  showAll = false,
  onEnd,
  className = '',
  spaceBetween,
  separate = false,
}) => {
  const [days, setDays] = useState(day);
  const [hours, setHours] = useState(hour);
  const [minutes, setMinutes] = useState(minute);
  const [seconds, setSeconds] = useState(second);

  useEffect(() => {
    let countDownInterval;
    const countDown = () => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else if (minutes > 0) {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours((prev) => prev - 1);
        setMinutes(59);
        setSeconds(59);
      } else if (days > 0) {
        setDays((prev) => prev - 1);
        setHours(23);
        setMinutes(59);
        setSeconds(59);
      } else {
        clearInterval(countDownInterval);
        if (onEnd) onEnd();
      }
    };

    countDownInterval = setInterval(countDown, 1000);

    return () => clearInterval(countDownInterval);
  }, [days, hours, minutes, seconds, onEnd]);

  const showDays = day > 0 || days > 0;
  const showHours = hour > 0 || hours > 0 || showDays;
  const showMinutes = minute > 0 || minutes > 0 || showHours;
  const showSeconds = second >= 0 || seconds >= 0 || showMinutes;

  return (
    <div className={`timer-wrapper ${className}`}>
      <p
        className={`timer-container flex items-center ${
          spaceBetween ? 'space-x-' + spaceBetween : 'space-x-2'
        }`}
      >
        {(showDays || showAll) && (
          <span
            className={`timer-element flex gap-1 ${vertical ? 'flex-col' : ''}`}
          >
            <span>{`${days.toString().padStart(2, '0')}`}</span>
            <span>{dayLabel}</span>
          </span>
        )}
        {(showAll || (showDays && showHours)) && separate && (
          <span className="inline-block border border-[#ccc] w-[1px] h-[14px] rounded-full"></span>
        )}
        {(showHours || showAll) && (
          <span
            className={`timer-element flex gap-1 ${vertical ? 'flex-col' : ''}`}
          >
            <span>{`${hours.toString().padStart(2, '0')}`}</span>
            <span>{hourLabel}</span>
          </span>
        )}
        {(showAll || (showMinutes && showHours)) && separate && (
          <span className="inline-block border border-[#ccc] w-[1px] h-[14px] rounded-full"></span>
        )}
        {(showMinutes || showAll) && (
          <span
            className={`timer-element flex gap-1 ${vertical ? 'flex-col' : ''}`}
          >
            <span>{`${minutes.toString().padStart(2, '0')}`}</span>
            <span>{minuteLabel}</span>
          </span>
        )}
        {(showAll || (showMinutes && showSeconds)) && separate && (
          <span className="inline-block border border-[#ccc] w-[1px] h-[14px] rounded-full"></span>
        )}
        {(showSeconds || showAll) && (
          <span
            className={`timer-element flex gap-1 ${vertical ? 'flex-col' : ''}`}
          >
            <span>{`${seconds.toString().padStart(2, '0')}`}</span>
            <span>{secondLabel}</span>
          </span>
        )}
      </p>
    </div>
  );
};

Timer.propTypes = {
  day: PropTypes.number,
  hour: PropTypes.number,
  minute: PropTypes.number,
  second: PropTypes.number,
  dayLabel: PropTypes.string,
  hourLabel: PropTypes.string,
  minuteLabel: PropTypes.string,
  secondLabel: PropTypes.string,
  vertical: PropTypes.bool,
  showAll: PropTypes.bool,
  onEnd: PropTypes.func,
  className: PropTypes.string,
  spaceBetween: PropTypes.number,
  separate: PropTypes.bool,
};

export default Timer;
