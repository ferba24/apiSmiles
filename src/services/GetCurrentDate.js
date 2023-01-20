//first 9 months need to have two numbers
const currentMonth = (new Date().getMonth() +1).toString().padStart(2, '0')

const currentYear = new Date().getFullYear()
export const currentDateFormat =  (
    currentYear
    + '-' +
    currentMonth)
