/**a
 * Returns a human readable date string following a handlebars-like template
 *
 * @param template - A string template with a valid format in a handlebars-like pattern `{{format}}`
 * @param DATE - (Optional) a valid date  string, date object or timestamp
 * @param offsetUTC -  (Optional) if true the time will reflect the actual UTC time
 *
 * @returns transpiled template | error string
 * @example
 * Available Date formats:
 *  {{year}} : full year (2022)
 *  {{yyyy}} : same as {{year}}
 *  {{yy}} : last 2 digits of the year (22)
 *  {{date}} : date number without trailing zero (9)
 *  {{d}} : same as {{date}}
 *  {{dd}} : date number with trailing zero (09)
 *  {{day}} : full name of the weekday (Monday)
 *  {{dayShort}} : 3 first letters of {{day}} (Mon)
 *  {{dayInitial}} : first letter of {{day}} (M)
 *  {{m}} : number of the month without trailing zero January is (1)
 *  {{mm}} : number of the month without trailing zero January is (01)
 *  {{month}} : full name of the month (January)
 *  {{monthShort}} : 3 first letters of {{month}} (Jan)
 *  {{mmm}} : same as {{monthShort}}
 *  {{hours}} : default 24 hour format with a trailing zero (24)
 *  {{minutes}} : minute with a trailing zero (03)
 *  {{seconds}} : second with a trailing zero (09)
 *  {{milliseconds}} : milliseconds with 2 trailing zeroes (003)
 *  {{hr}} : default 24 hour format without a trailing zero (24)
 *  {{min}} : minute without a trailing zero (3)
 *  {{sec}} : second without a trailing zero (9)
 *  {{ms}} : milliseconds without trailing zeroes (3)
 *  {{ampm}} : hours are in a 12 hour format with the meridian as lowercase (am)
 *  {{AMPM}} : hours are in a 12 hour format with the meridian as uppercase (PM)
 *
 * @example
 * ```
 * formatDate('{{dd}}/{{mm}}/{{yy}}') //  08/02/22
 * formatDate('{{month}} {{d}}, {{yyyy}}', '08/01/1990') //  August 1, 1990
 * formatDate('You were born in {{day}}!', 'Apr 8 2009' ) //  You were born in Wednesday!
 * ```
 * @example
 * `Valid Date parameters`
 * ```
 * // TimeStamp
 * formatDate('{{dd}}/{{mm}}/{{yy}} - {{hr}}:{{min}}:{{sec}}', 1634685687123 ) //  19/10/21 - 18:21:27
 * // String Date
 * formatDate('{{day}} {{mmm}} {{d}}, {{yyyy}}', '90/12/07') //  Friday Dec 7, 1990
 * // Date object
 * formatDate('Tomorrow is {{mmm}} {{d}}, {{yy}}', new Date(1644603180856)) //  Tomorrow is Feb 11, 22
 * // No date - defaults to (new Date())
 * formatDate('Today is {{day}}!') // Today is Friday!
 * ```
 */
export function formatDate(
  template,
  DATE, // string | number | Date,
  offsetUTC = false,
) {
  if (!template)
    return "Missing template. try something like: {{yyyy}}/{{mm}}/{{dd}}";

  let D = !DATE ? new Date() : new Date(DATE);
  D = !offsetUTC
    ? D
    : new Date(D.setHours(D.getHours() + D.getTimezoneOffset() / 60));

  if (isNaN(D.getFullYear()))
    return "Invalid date. enter a valid date string, timestamp or date object";

  const year = `${D.getFullYear()}`;
  const date = `${D.getDate()}`;
  const day = weekday[D.getDay()];
  const month = D.getMonth();
  let hr = D.getHours();
  const min = D.getMinutes();
  const sec = D.getSeconds();
  const ms = D.getMilliseconds();
  const AMPM = hr >= 12 ? "PM" : "AM";

  if (/(AMPM|ampm)/.test(template)) {
    hr = hr % 12;
    hr = hr > 0 ? hr : 12;
  }

  const formats = {
    year,
    yyyy: year,
    yy: year.substring(2),
    date,
    d: date,
    dd: date.padStart(2, "0"),
    day,
    dayShort: day.substring(0, 3),
    dayInitial: day.substring(0, 1),
    m: `${month + 1}`,
    mm: `${month + 1}`.padStart(2, "0"),
    mmm: `${months[month]}`.substring(0, 3),
    month: `${months[month]}`,
    monthShort: `${months[month]}`.substring(0, 3),
    hours: `${hr}`.padStart(2, "0"),
    minutes: `${min}`.padStart(2, "0"),
    seconds: `${ms}`.padStart(3, "0"),
    milliseconds: `${hr}`.padStart(2, "0"),
    hr,
    min,
    sec,
    ms,
    ampm: AMPM.toLowerCase(),
    AMPM,
  };

  let str = "";

  while (template.length) {
    const start = template.indexOf("{{");
    const end = template.indexOf("}}");

    if (start === 0 && end > 0) {
      const key = template.substring(start + 2, end);
      const F = formats[`${key}`];
      if (!F) return `Unknown format type: ${key}`;
      str += F;
      template = template.substring(end + 2);
    } else {
      str += template[0];
      template = template.substring(1);
    }
  }

  return str;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
