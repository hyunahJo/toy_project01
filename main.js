const currentTitle = document.querySelector(".calendar__current-year-month");
const calendarBody = document.querySelector(".calendar__body");
const today = new Date();
const first = new Date(today.getFullYear(), today.getMonth(), 1);
const dayList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const monthList = [
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
const leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const pageFirst = first;
const pageYear;
if(first.getFullYear() % 4 ===0) {
    pageYear = leapYear;
} else {
    pageYear = notLeapYear;
}

