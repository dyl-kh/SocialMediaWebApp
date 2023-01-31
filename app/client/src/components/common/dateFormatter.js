// date formatter for all posts and replies
export const getDateTimeStr = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = today.toLocaleString('default', { month: 'long' });
    const yyyy = today.getFullYear();
    let hh = String(today.getHours());
    const minutes = String(today.getMinutes()).padStart(2, '0');
    let hour = 'AM';
    if (hh > 12) {
        hh -= 12;
        hour = 'PM';
    }

    return `${dd} ${mm} ${yyyy} at ${hh}:${minutes} ${hour}`;
};

// Custom date formatter for profile
export const getCurrentDateForProfile = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
};
