const datePresent = (date, array) => {
  return array.findIndex(each => {
    return Object.keys(each)[0] === date;
  });
};

/**
 * Returns array with objects of the same date grouped into single array
 * @param {array} array 
 */
const formatArrayByDate = array => { 
  const newArr = []; 
  array.forEach((each) => {
    const dateObj = {
      [each.Date]: [each]     
    };
    const index = datePresent(each.Date, newArr);
    if (index < 0) {
      newArr.push(dateObj);
    } else {      
      const key = Object.keys(newArr[index]);
      newArr[index][key].push(each);
    }  
  });
  return newArr;     
};

/**
 * Add multiple entries of the same day together
 * @param {array} array 
 * @param {properties to add} param1 // TODO this should be optional
 */
const formatArrayByDateTotals = (array, [propsToConsolidate]) => { // TODO some refactoring of this function
  let formattedByDate = formatArrayByDate(array);
  formattedByDate.forEach(day => {
    const key = Object.keys(day)[0]; // we only have one object per day
    const value = day[key];
    const totals = {};
    value.forEach(entry => {
      Object.keys(entry).forEach(prop => {
        if (propsToConsolidate.includes(prop)) {
          if (!totals[prop]) {
            totals[prop] = entry[prop];
          } else {
            const currentValue = totals[prop];
            totals[prop] = Number(totals[prop]) + Number(entry[prop]);
          }
        } 
      });      
    });
    day[key] = totals;
  });
  return formattedByDate;
};

export { formatArrayByDate, formatArrayByDateTotals };