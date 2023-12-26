export const daysSinceEpoch = (date: Date | undefined) =>
  date === undefined ? 0 : Math.floor(date.getTime() / 86.4e6);
