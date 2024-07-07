const timeDifference = (diffMs: number): string => {
  const msPerMinute: number = 60 * 1000;
  const msPerHour: number = msPerMinute * 60;
  const msPerDay: number = msPerHour * 24;
  const msPerWeek: number = msPerDay * 7;
  const msPerMonth: number = msPerDay * 30; // Rough approximation of a month
  const msPerYear: number = msPerDay * 365;

  if (diffMs < msPerMinute) {
    const seconds: number = Math.round(diffMs / 1000);
    return `${seconds} seconds ago`;
  } else if (diffMs < msPerHour) {
    const minutes: number = Math.round(diffMs / msPerMinute);
    return `${minutes} minutes ago`;
  } else if (diffMs < msPerDay) {
    const hours: number = Math.round(diffMs / msPerHour);
    return `${hours} hours ago`;
  } else if (diffMs < msPerWeek) {
    const days: number = Math.round(diffMs / msPerDay);
    return `${days} days ago`;
  } else if (diffMs < msPerMonth) {
    const weeks: number = Math.round(diffMs / msPerWeek);
    return `${weeks} weeks ago`;
  } else if (diffMs < msPerYear) {
    const months: number = Math.round(diffMs / msPerMonth);
    return `${months} months ago`;
  } else {
    const years: number = Math.round(diffMs / msPerYear);
    return `${years} years ago`;
  }
};

const secondToTimeStringConversion = (sec: number): string => {
  const sPerMinute: number = 60;
  let ans = "";
  if (sec < sPerMinute) {
    ans = "00:" + `${sec < 10 ? "0" + sec : sec}`;
  } else {
    const min = Math.floor(sec / sPerMinute);
    const seconds = sec % sPerMinute;
    ans = `${min < 10 ? "0" + min : min}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }
  return ans;
};

export { timeDifference, secondToTimeStringConversion };
