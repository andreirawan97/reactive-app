export function msToTime(ms: number) {
  let minutes = Math.floor(ms / 60000);
  let seconds = Number(((ms % 60000) / 1000).toFixed(0));

  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export function msToCompletionTime(currentTime: number, timeLimit: number) {
  let difference = timeLimit - currentTime;
  let minutes = Math.floor(difference / 60000);
  let seconds = Number(((difference % 60000) / 1000).toFixed(0));

  return `${minutes} minute(s) ${seconds < 10 ? '0' : ''}${seconds} second(s)`;
  // return minutes + ' minute(s) ' + (seconds < 10 ? '0' : '') + seconds + ' second(s)';
}
