export const DateFormatterQuery = () => {
  let currentDate = new Date();

  // Extract day, month, and year
  let day: string | number = currentDate.getDate();
  let month: string | number = currentDate.getMonth() + 1; // Note: January is 0!
  let year = currentDate.getFullYear();

  if (day < 10) {
    day = "0" + day;
  }

  if (month < 10) {
    month = "0" + month;
  }

  // english

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};
