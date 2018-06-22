export const slotTimes=(slot) => {
  if(slot==null) return '--';
  const hour=7+Math.floor(slot/3);
  const minutes=(slot%3)*20;
  return ("0"+hour).slice(-2)+':'+("0"+minutes).slice(-2);
}

export const nSlots = 3*16;

export const months=[
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const weekdays=[
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];
