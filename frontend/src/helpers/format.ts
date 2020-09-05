export function msToTime(ms: number) {
  let minutes = Math.floor(ms / 60000);
  let seconds = Number(((ms % 60000) / 1000).toFixed(0));

  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
