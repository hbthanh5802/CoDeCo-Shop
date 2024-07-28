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
  const now = new Date();
  const dataTimeObject = new Date(dateTimeString);
  const timeDifference = dataTimeObject - now;

  if (timeDifference <= 0) return true; // YES. It expired

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  return {
    days,
    remainingHours,
    remainingMinutes,
    remainingSeconds,
  };
};
