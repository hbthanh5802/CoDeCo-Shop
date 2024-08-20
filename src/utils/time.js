import * as timeago from 'timeago.js';

export const isValidDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return !isNaN(date.getTime());
};

export const getDateTimeDetail = (dateTimeString) => {
  if (!isValidDateTime) return false;
  const dataTimeObject = new Date(dateTimeString);
  return {
    year: dataTimeObject.getFullYear(),
    month: dataTimeObject.getMonth() + 1, // Tháng bắt đầu từ 0
    day: dataTimeObject.getDate(),
    hours: dataTimeObject.getHours(),
    minutes: dataTimeObject.getMinutes(),
    seconds: dataTimeObject.getSeconds(),
  };
};

export const isDateTimeExpired = (dateTimeString) => {
  // Tách ngày và giờ
  const [datePart, timePart] = dateTimeString.split(' ');
  // Tách ngày, tháng, năm
  const [day, month, year] = datePart.split('-').map(Number);
  // Tách giờ, phút, giây
  const [hours, minutes, seconds] = timePart.split(':').map(Number);
  // Tạo đối tượng Date
  const dataTimeObject = new Date(
    year,
    month - 1,
    day,
    hours,
    minutes,
    seconds
  );

  const now = new Date();
  const timeDifference = dataTimeObject - now;

  if (timeDifference <= 0) return true; // YES. It expired

  const totalSeconds = Math.floor(timeDifference / 1000);
  const remainingSeconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const remainingMinutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingHours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return {
    days,
    remainingHours,
    remainingMinutes,
    remainingSeconds,
  };
};

const localeFunc = (number, index, totalSec) => {
  return [
    ['mới đây', 'mới đây'],
    ['%s giây trước', 'trong %s giây'],
    ['1 phút trước', 'trong 1 phút trước'],
    ['%s phút trước', 'trong %s phút trước'],
    ['1 giờ ago', 'trong 1 giờ trước'],
    ['%s giờ trước', 'trong %s giờ trước'],
    ['1 ngày trước', 'trong 1 ngày trước'],
    ['%s ngày trước', 'trong %s ngày'],
    ['1 tuần trước', 'trong 1 tuần trước'],
    ['%s tuần trước', 'trong %s tuần trước'],
    ['1 tháng trước', 'trong 1 tháng trước'],
    ['%s tháng trước', 'trong %s tháng trước'],
    ['1 năm trước', 'trong 1 năm trước'],
    ['%s năm trước', 'trong %s năm trước'],
  ][index];
};

// register your locale with timeago
timeago.register('my-locale', localeFunc);

export const getTimeAgo = (dateTimeString) => {
  if (!isValidDateTime) return false;
  return timeago.format(dateTimeString, 'my-locale');
};
