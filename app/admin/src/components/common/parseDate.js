// This helper function is used to parse the date from the database
// which usually returns an integer for dateTime
const parseDate = dateInt => {
    // convert to DD/MM/YYYY, HH:MM:SS
    const date = new Date(parseInt(dateInt, 10));
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDateTime = `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
};

export default parseDate;
