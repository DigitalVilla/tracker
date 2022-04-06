/**
 * Easily set future time expiries using human a readable time length
 *
 * @param length - human readable length, one of 'min' | 'day' | 'week' | 'year' | 'hour'
 * @param multiplier - (optional)  times it will increase the length, default to 1
 * @param timestamp - (optional) set expiry from timestamp, defaults to Date.now()
 * @returns
 */
export function setExpiry(length, multiplier = 1, timestamp) {
  const ts = timestamp || Math.floor(Date.now() / 1000);
  switch (length) {
    case "sec":
      return ts + Math.floor(multiplier);
    case "min":
      return ts + Math.floor(multiplier * 60);
    case "hour":
      return ts + Math.floor(multiplier * 3600);
    case "day":
      return ts + Math.floor(multiplier * 86400);
    case "week":
      return ts + Math.floor(multiplier * (86400 * 7));
    case "year":
      return ts + Math.floor(multiplier * 31557600);
    default:
      throw new Error(
        "Missing length: 'min' | 'day' | 'week' | 'year' | 'hour'",
      );
  }
}

export function isExpired(exp) {
  return exp < Math.floor(Date.now() / 1000);
}
