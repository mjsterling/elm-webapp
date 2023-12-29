import { daysSinceEpoch } from "../utils/dateUtils";

export class DateManager {
  year: number;
  month: number;
  date: number;

  get asDate() {
    return new Date(this.year, this.month, this.date);
  }

  get day() {
    return this.asDate.getDay();
  }

  get asDays() {
    return daysSinceEpoch(this.asDate);
  }

  get monthAsFullString() {
    return [
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
    ][this.month];
  }

  get monthAsShortString() {
    return this.monthAsFullString.slice(0, 3);
  }

  daysIn(month: number) {
    switch (month) {
      case 1:
        return this.year % 4 === 0 ? 29 : 28;
      case 3:
      case 5:
      case 8:
      case 10:
        return 30;
      default:
        return 31;
    }
  }

  constructor(date: Date = new Date(new Date().setHours(16))) {
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.date = date.getDate();
  }

  backOneDay() {
    return new DateManager(new Date(this.year, this.month, this.date - 1));
  }

  forwardOneDay() {
    return new DateManager(new Date(this.year, this.month, this.date + 1));
  }

  fromDays(days: number) {
    return new DateManager(new Date(days * 86.4e6));
  }

  backOneMonth() {
    if (this.month === 0) {
      this.year -= 1;
      this.month = 11;
    } else {
      this.month -= 1;
    }
    return new DateManager(this.asDate);
  }

  forwardOneMonth() {
    if (this.month === 11) {
      this.year += 1;
      this.month = 0;
    } else {
      this.month += 1;
    }
    return new DateManager(this.asDate);
  }
}
