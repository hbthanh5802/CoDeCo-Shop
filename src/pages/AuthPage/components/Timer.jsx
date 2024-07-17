import React, { useEffect, useState } from 'react';

const Timer = ({
  day,
  hour,
  minute,
  second,
  dayLabel = 'ngày',
  hourLabel = 'giờ',
  minuteLabel = 'phút',
  secondLabel = 'giây',
  onEnd,
  className = '',
}) => {
  const [days, setDays] = useState(day || 0);
  const [hours, setHours] = useState(hour || 0);
  const [minutes, setMinutes] = useState(minute || 0);
  const [seconds, setSeconds] = useState(second || 0);

  useEffect(() => {
    let countDownInterval;
    const countDown = () => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            if (days > 0) {
              setDays(days - 1);
              setHours(23);
              setMinutes(59);
              setSeconds(59);
            } else {
              if (onEnd) onEnd();
              clearInterval(countDownInterval);
            }
          }
        }
      }
    };

    countDownInterval = setInterval(countDown, 1000);

    return () => clearInterval(countDownInterval);
  }, [days, hours, minutes, seconds]);

  return (
    <div className={className}>
      <p className="flex space-x-1">
        <span>{day && `${days.toString().padStart(2, '0')}  ${dayLabel}`}</span>
        <span>
          {hour && `${hours.toString().padStart(2, '0')}  ${hourLabel}`}
        </span>
        <span>
          {minute && `${minutes.toString().padStart(2, '0')}  ${minuteLabel}`}
        </span>
        <span>
          {second && `${seconds.toString().padStart(2, '0')}  ${secondLabel}`}
        </span>
      </p>
    </div>
  );
};

export default Timer;
